import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import Topbar from "./Topbar";
import Heading from "./Heading";
import Loader from "../Components/UI/Loader";
import { useSelector } from "react-redux";

const Master = () => {
  const { isLoading } = useSelector((state) => state.ui);
  return (
    <>
      <Topbar />
      <Sidebar />

      <section className="page-wrapper">
        <div className="page-content">
          <Heading />
          <div className="card">
            <Outlet />
          </div>
        </div>
      </section>
      {isLoading && <Loader />}
    </>
  );
};

export default Master;
