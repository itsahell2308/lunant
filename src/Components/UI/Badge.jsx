import React from "react";

const TruFalseBadge = ({ getValue }) => {
  const value = getValue();
  const data = value ? "success" : "danger";
  return (
    <span className={`badge bg-${data}-subtle text-${data}`}>
      {value ? "TRUE" : "FALSE"}
    </span>
  );
};

const OpenCloseBadge = ({ getValue }) => {
  const value = getValue();
  const data = value ? "success" : "danger";
  return (
    <span className={`badge bg-${data}-subtle text-${data}`}>
      {value ? "TRUE" : "FALSE"}
    </span>
  );
};

const YesNoBadge = ({ getValue }) => {
  const value = getValue();
  const data = value ? "success" : "danger";
  return (
    <span className={`badge bg-${data}-subtle text-${data}`}>
      {value ? "YES" : "NO"}
    </span>
  );
};

const StaticBadge = ({ getValue }) => {
  return (
    <span className={`badge bg-primary-subtle text-primary`}>{getValue()}</span>
  );
};

export { TruFalseBadge, OpenCloseBadge, StaticBadge, YesNoBadge };
