import * as Yup from "yup";

export const MatchSchema = Yup.object().shape({
  sports: Yup.object().required("Sport is required"),
  tournament: Yup.object().required("Tournament is required"),
  matchName: Yup.string().required("Match Name is required"),
  startDate: Yup.date().required("Start Date is required"),
  hour: Yup.number()
    .required("Hour is required")
    .min(0, "Hour must be between 0 and 23")
    .max(23, "Hour must be between 0 and 23"),
  min: Yup.number()
    .required("Minute is required")
    .min(0, "Minute must be between 0 and 59")
    .max(59, "Minute must be between 0 and 59"),
  sec: Yup.number()
    .required("Second is required")
    .min(0, "Second must be between 0 and 59")
    .max(59, "Second must be between 0 and 59"),
});

export const LiveTvSchema = Yup.object().shape({
  liveTv: Yup.object().required("Select is required"),
});

export const scoreCardSchema = Yup.object().shape({
  matchTempId: Yup.string().required("Match Id is required"),
});
