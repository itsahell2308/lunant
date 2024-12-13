import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default LoginSchema;
