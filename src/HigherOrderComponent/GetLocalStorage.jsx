import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GetLocalStorage = ({ children }) => {
  const { token } = useSelector((state) => state.user);

  if (!token) {
    return children;
  }
  return <Navigate to="/" />;
};

export default GetLocalStorage;
