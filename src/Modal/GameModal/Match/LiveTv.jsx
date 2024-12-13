import { useFormik } from "formik";
import React from "react";
import {
  editLiveTvUrl,
  getAllChannels,
} from "../../../Services/game/matchService";
import { useQuery } from "@tanstack/react-query";
import { CustomSelect, Error, Label } from "../../../Components";
import { LiveTvSchema } from "../../../Schema/Game/MatchSchema";

const LiveTv = ({ rowData, handleShowHide }) => {
  const { values, touched, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      liveTv: null,
    },
    validationSchema: LiveTvSchema,
    onSubmit: async (values) => {
      const body = {
        ...rowData,
        channelUrl: values?.liveTv?.value,
      };
      const res = editLiveTvUrl(body?._id, body);
      if (res) {
        handleShowHide();
      }
    },
  });

  const { data } = useQuery({
    queryKey: ["liveTvData"],
    queryFn: async () => await getAllChannels(),
  });

  const liveTvOption =
    data?.map((item) => ({
      value: item.channelUrl,
      label: item.channelName,
    })) || [];

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <Label htmlFor="liveTv" className="form-label" isRequired={true}>
          Select Tv Channels
        </Label>
        <CustomSelect
          options={liveTvOption}
          value={values.liveTv}
          onChange={(selectedOption) => setFieldValue("liveTv", selectedOption)}
          placeholder="Select Tv"
          isMulti={false}
        />
        {errors.liveTv && touched.liveTv && <Error>{errors.liveTv}</Error>}
      </div>

      <button type="submit" id="form-submit-btn" hidden>
        Submit
      </button>
    </form>
  );
};

export default LiveTv;
