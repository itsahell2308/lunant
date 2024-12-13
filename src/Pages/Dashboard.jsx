import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { uiActions } from "../store/ui/ui-slice";

const Dashboard = () => {
  const location = useLocation();
  const { heading } = location.state || {};

  const dispatch = useDispatch();

  if (heading) {
    dispatch(uiActions.setHeading(heading));
  }

  return <div className="card-body">Dashboard</div>;
};

export default Dashboard;
