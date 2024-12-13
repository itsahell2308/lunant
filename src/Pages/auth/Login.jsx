import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/css/login.scss";
import { Button, Error, Image, Label } from "../../Components";
import LoginSchema from "../../Schema/LoginSchema";
import Icon from "../../assets/icons/Icon";
import { loginUser } from "../../store/user/user-action";

const Login = () => {
  const [showHide, setShowHide] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ui);
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
        channel: "WEB",
        deviceId: "fromwebdeviceId123",
        fcmToken: "fromwebfcmtoken123",
      },
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        loginUser(dispatch, values);
      },
    });

  return (
    <section className="body_box">
      <div className="login-part">
        <Link to="" className="logo_box ">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            className="logo_img"
          />
        </Link>
        <p>Sign in to continue to DG Office.</p>
        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="form-group input_box_card">
            <Label className="form-label" for="userName">
              Username
            </Label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              placeholder="Enter userName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName}
              autoFocus
            />
            {errors.userName && touched.userName && (
              <Error>{errors.userName}</Error>
            )}
          </div>
          <div className="form-group input_box_card">
            <Label className="form-label" for="password">
              Password
            </Label>
            <input
              type={`${!showHide ? "password" : "text"}`}
              className="form-control"
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            <div className="eye_icon" onClick={() => setShowHide(!showHide)}>
              {showHide ? <Icon name="FaEye" /> : <Icon name="FaEyeSlash" />}
            </div>
            {errors.password && touched.password && (
              <Error>{errors.password}</Error>
            )}
          </div>
          <div className="form-group input_box_card ">
            <Button
              className="btn btn-primary "
              type="submit"
              icon="FaSignInAlt"
              isDisabled={isLoading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
