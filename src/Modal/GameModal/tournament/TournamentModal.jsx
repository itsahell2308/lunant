import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { uiActions } from "../../../store/ui/ui-slice";
import { featureActions } from "../../../store/feature/feature-slice";
import { Button, Error, Label } from "../../../Components";
import { generateRandomId } from "../../../helper/common";
import TournamentSchema from "../../../Schema/Game/TournamentSchema";
import { API_POST_TOURNAMENT } from "../../../utils/api/ApiConstant";

const TournamentModal = ({ handleShowHide, combineData = {} }) => {
  const { sportList } = combineData;
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        id: generateRandomId(),
        name: "",
        isManual: true,
        isActive: false,
        sport: null,
        isDeleted: false,
      },
      validationSchema: TournamentSchema,
      onSubmit: async (values) => {
        const sportobj = sportList.find((sport) => sport.id == values.sport);
        const payload = {
          ...values,
          sport: { id: sportobj.id, name: sportobj.name },
        };
        dispatch(uiActions.setLoading(true));

        const res = await postApiTournament(API_POST_TOURNAMENT, payload);
        // const res = true;
        dispatch(uiActions.setLoading(false));
        if (res) {
          dispatch(featureActions.setTournament());
          handleShowHide();
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="row m-0 p-0">
        <div className="col-md-6 m-0 p-1">
          <Label htmlFor="name" className="form-label" isRequired={true}>
            Sport name
          </Label>
          <select
            value={values.sport}
            onChange={handleChange}
            name="sport"
            id="sport"
            className="form-control"
          >
            <option value="">Select Sport</option>
            {sportList &&
              sportList.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
          </select>
          {errors.sport && touched.sport && <Error>{errors.sport}</Error>}
        </div>
        <div className="col-md-6 m-0 p-1">
          <Label htmlFor="name" className="form-label" isRequired={true}>
            Tournament
          </Label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && <Error>{errors.name}</Error>}
        </div>
      </div>
      <Button type="submit" id="form-submit-btn" isHidden={true}>
        Submit
      </Button>
    </form>
  );
};

export default TournamentModal;
