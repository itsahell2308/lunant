import * as Yup from "yup";

const UploadSchema = Yup.object().shape({
  apiName: Yup.string().required("Api name is required"),
  apiUrl: Yup.string().required("Api url is required"),
  displayOrder: Yup.number().required("Display order is required"),
  type: Yup.object().required("Type is required"),
  whitelableTypes: Yup.array()
    .min(1, "At least one value is required")
    .required("White lable types is required"),
});

export default UploadSchema;
