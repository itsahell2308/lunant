import * as Yup from "yup";

export const MarketSchema = Yup.object().shape({
  sports: Yup.object().required("Sport is required"),
  tournament: Yup.object().required("Tournament is required"),
  match: Yup.object().required("Match is required"),
});
