import * as Yup from "yup";

const SportSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  id: Yup.number().required("Id is required"),
});

export default SportSchema;
