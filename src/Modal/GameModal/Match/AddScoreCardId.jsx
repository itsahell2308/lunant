import { useFormik } from "formik";
import React from "react";
import { editLiveTvUrl } from "../../../Services/game/matchService";
import { Error, Label } from "../../../Components";
import { scoreCardSchema } from "../../../Schema/Game/MatchSchema";

const AddScoreCardId = ({ rowData, handleShowHide }) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        matchTempId: "",
      },
      validationSchema: scoreCardSchema,
      onSubmit: async (values) => {
        const body = {
          ...rowData,
          matchTempId: values?.matchTempId,
        };
        const res = editLiveTvUrl(body?._id, body);
        if (res) {
          handleShowHide();
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <Label htmlFor="liveTv" className="form-label" isRequired={true}>
          Match Id
        </Label>
        <input
          type="text"
          className="form-control"
          name="matchTempId"
          id="matchTempId"
          placeholder="Enter ID"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.matchTempId}
        />
        {errors.matchTempId && touched.matchTempId && (
          <Error>{errors.matchTempId}</Error>
        )}
      </div>

      <button type="submit" id="form-submit-btn" hidden>
        Submit
      </button>
    </form>
  );
};

export default AddScoreCardId;
