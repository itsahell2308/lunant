import * as Yup from "yup";

const TournamentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  sport: Yup.number().required("Sport is required"),
});

export default TournamentSchema;
