import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { Button, Error, Label } from "../../Components";
import SportSchema from "../../Schema/Game/SportSchema";
import { postApiSport } from "../../Services/game/sportService";
import { featureActions } from "../../store/feature/feature-slice";
import { uiActions } from "../../store/ui/ui-slice";
import { API_POST_SPORT } from "../../utils/api/ApiConstant";

const SportModal = ({ handleShowHide }) => {
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        id: "",
        isManual: true,
        isActive: false,
        betLock: false,
        isView: false,
        isDeleted: false,
        autoImport: false,
        displayOrder: 9,
      },
      validationSchema: SportSchema,
      onSubmit: async (values) => {
        dispatch(uiActions.setLoading(true));

        const res = await postApiSport(API_POST_SPORT, values);
        dispatch(uiActions.setLoading(false));
        if (res) {
          dispatch(featureActions.setSport());
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
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Enter sport name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            autoFocus={true}
          />
          {errors.name && touched.name && <Error>{errors.name}</Error>}
        </div>
        <div className="col-md-6 m-0 p-1">
          <Label htmlFor="id" className="form-label" isRequired={true}>
            Betfair id
          </Label>
          <input
            type="number"
            className="form-control"
            name="id"
            id="id"
            placeholder="Enter id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.id}
          />
          {errors.id && touched.id && <Error>{errors.id}</Error>}
        </div>
      </div>
      <Button type="submit" id="form-submit-btn" isHidden={true}>
        Submit
      </Button>
    </form>
  );
};

export default SportModal;
