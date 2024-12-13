import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import SportSchema from "../../Schema/Game/SportSchema";
import { CustomSelect, Error, Label } from "../../Components";
import { postApiUpload } from "../../Services/uploadService";
import UploadSchema from "../../Schema/UploadSchema";
import { uiActions } from "../../store/ui/ui-slice";
import { featureActions } from "../../store/feature/feature-slice";
import { API_POST_IMAGES } from "../../utils/api/ApiConstant";

const typeOptions = [
  { value: "Banner", label: "Banner" },
  { value: "Casino", label: "Casino" },
  { value: "Sidebar", label: "Sidebar" },
  { value: "Support", label: "Support" },
];

const whitelableTypesOptions = [
  { value: "scal_apex", label: "scal_apex" },
  { value: "cricbetz", label: "Cricbetz" },
  { value: "99sport", label: "99sport" },
];

const UploadModal = ({ handleShowHide }) => {
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      apiName: "",
      apiUrl: "",
      displayOrder: 1,
      type: null,
      whitelableTypes: [],
      isActive: false,
      id: "2020310988715",
    },
    validationSchema: UploadSchema,
    onSubmit: async (values) => {
      dispatch(uiActions.setLoading(true));

      //customize payload
      const payload = { ...values, type: values.type.value };
      const res = await postApiUpload(API_POST_IMAGES, payload);
      dispatch(uiActions.setLoading(false));
      if (res) {
        dispatch(featureActions.setUpload());
        handleShowHide();
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="row m-0 p-0">
        <div className="col-md-6 m-0 p-1">
          <Label htmlFor="apiName" className="form-label" isRequired={true}>
            Api Name
          </Label>
          <input
            type="text"
            className="form-control"
            name="apiName"
            id="apiName"
            placeholder="Enter api name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.apiName}
            autoFocus={true}
          />
          {errors.apiName && touched.apiName && <Error>{errors.apiName}</Error>}
        </div>

        <div className="col-md-6 m-0 p-1">
          <Label htmlFor="type" className="form-label" isRequired={true}>
            Type
          </Label>
          <CustomSelect
            options={typeOptions}
            value={values.type}
            onChange={
              (selectedOption) => setFieldValue("type", selectedOption) // Single select sets an object
            }
            placeholder="Choose an option"
            isMulti={false}
          />
          {errors.type && touched.type && <Error>{errors.type}</Error>}
        </div>

        <div className="col-md-6 m-0 p-1">
          <Label className="form-label" htmlFor="apiUrl" isRequired={true}>
            Api Url
          </Label>
          <input
            type="text"
            className="form-control"
            id="apiUrl"
            name="apiUrl"
            placeholder="Enter Api url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.apiUrl}
          />
          {errors.apiUrl && touched.apiUrl && <Error>{errors.apiUrl}</Error>}
        </div>

        <div className="col-md-6 m-0 p-1">
          <Label
            className="form-label"
            htmlFor="displayOrder"
            isRequired={true}
          >
            Display Order
          </Label>
          <input
            type="number"
            className="form-control"
            id="displayOrder"
            name="displayOrder"
            placeholder="Enter display order"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.displayOrder}
          />
          {errors.displayOrder && touched.displayOrder && (
            <Error>{errors.displayOrder}</Error>
          )}
        </div>

        <div className="col-md-6 m-0 p-1">
          <Label
            className="form-label"
            htmlFor="whitelableTypes"
            isRequired={true}
          >
            Wht Selection
          </Label>
          <CustomSelect
            options={whitelableTypesOptions}
            value={values.whitelableTypes.map((value) =>
              whitelableTypesOptions.find((option) => option.value === value)
            )}
            onChange={(selectedOptions) =>
              setFieldValue(
                "whitelableTypes",
                selectedOptions ? selectedOptions.map((opt) => opt.value) : []
              )
            }
            placeholder="Choose options"
            isMulti={true}
          />
          {errors.whitelableTypes && touched.whitelableTypes && (
            <Error>{errors.whitelableTypes}</Error>
          )}
        </div>
      </div>
      <button type="submit" id="form-submit-btn" hidden>
        submit
      </button>
    </form>
  );
};

export default UploadModal;
