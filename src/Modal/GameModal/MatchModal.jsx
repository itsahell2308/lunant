import React from "react";
import { useFormik } from "formik";
import { MatchSchema } from "../../Schema/Game/MatchSchema";
import {
  CustomSelect,
  DatePickerComponent,
  Error,
  Label,
} from "../../Components";
import { useQuery } from "@tanstack/react-query";
import {
  getFilterSport,
  getFilterTournament,
} from "../../Services/commonService";
import { addMatch } from "../../Services/game/matchService";

const MatchModal = ({ handleShowHide }) => {
  const formatDate = (date, hour, min, sec) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const day = date.getDate();
    return `${year}-${month}-${day} ${hour}:${min}:${sec}.000Z`;
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      sports: null,
      tournament: null,
      matchName: "",
      startDate: null,
      hour: "",
      min: "",
      sec: "",
    },
    validationSchema: MatchSchema,
    onSubmit: async (values) => {
      const openDate = formatDate(
        values.startDate,
        values.hour,
        values.min,
        values.sec
      );

      const body = {
        id: Date.now(),
        name: values?.matchName || "",
        countryCode: null,
        timezone: "GMT",
        openDate: openDate,
        isManual: true,
        inPlay: false,
        isActive: false,
        isDeleted: false,
        tournament: {
          id: values.tournament?.value,
          name: values.tournament?.label,
        },
        sport: {
          id: values.sports?.value,
          name: values.sports?.label,
        },
        priority: 0,
      };

      const res = await addMatch(body);
      if (res) {
        handleShowHide();
      }
    },
  });

  const { data: sportData } = useQuery({
    queryKey: ["filterSport"],
    queryFn: async () => await getFilterSport(1, -1),
    staleTime: 300000,
  });

  const { data: tournamentData } = useQuery({
    queryKey: ["filterTournament", values.sports],
    queryFn: async () =>
      values.sports?.value
        ? await getFilterTournament(values.sports.value, 1, 100)
        : [],
    staleTime: 300000,
    enabled: !!values.sports?.value, // Only fetch tournaments when a sport is selected
  });

  const sportOptions =
    sportData?.docs
      ?.filter((item) => item.isActive)
      ?.map((item) => ({ value: item.id, label: item.name })) || [];

  const tournamentOptions =
    tournamentData?.docs
      ?.filter((item) => item.isActive)
      ?.map((item) => ({ value: item.id, label: item.name })) || [];

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <Label htmlFor="sports" className="form-label" isRequired={true}>
            Sports
          </Label>
          <CustomSelect
            options={sportOptions}
            value={values.sports}
            onChange={(selectedOption) =>
              setFieldValue("sports", selectedOption)
            }
            placeholder="Select Sports"
            isMulti={false}
          />
          {errors.sports && touched.sports && <Error>{errors.sports}</Error>}
        </div>

        <div className="col-md-6">
          <Label htmlFor="tournament" className="form-label" isRequired={true}>
            Tournament
          </Label>
          <CustomSelect
            options={tournamentOptions}
            value={values.tournament}
            onChange={(selectedOption) =>
              setFieldValue("tournament", selectedOption)
            }
            placeholder="Select Tournament"
            isMulti={false}
            isDisabled={!values.sports} // Disable tournament dropdown if no sport is selected
          />
          {errors.tournament && touched.tournament && (
            <Error>{errors.tournament}</Error>
          )}
        </div>

        <div className="col-md-4">
          <Label htmlFor="matchName" className="form-label" isRequired={true}>
            Match Name
          </Label>
          <input
            type="text"
            className="form-control"
            name="matchName"
            id="matchName"
            placeholder="Enter name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.matchName}
          />
          {errors.matchName && touched.matchName && (
            <Error>{errors.matchName}</Error>
          )}
        </div>

        <div className="col-md-4">
          <Label htmlFor="startDate" className="form-label" isRequired={true}>
            Start Date
          </Label>
          <DatePickerComponent
            selectedDate={values.startDate}
            onChange={(date) => setFieldValue("startDate", date)}
            placeholderText="Pick a start date"
            minDate={new Date()}
          />
          {errors.startDate && touched.startDate && (
            <Error>{errors.startDate}</Error>
          )}
        </div>

        <div className="col-md-4">
          <Label htmlFor="time" className="form-label" isRequired={true}>
            Time
          </Label>
          <div
            className="time-input-group"
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <input
              type="number"
              className="form-control"
              name="hour"
              id="hour"
              placeholder="HH"
              min="0"
              max="23"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.hour}
            />
            <span>:</span>
            <input
              type="number"
              className="form-control"
              name="min"
              id="min"
              placeholder="MM"
              min="0"
              max="59"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.min}
            />
            <span>:</span>
            <input
              type="number"
              className="form-control"
              name="sec"
              id="sec"
              placeholder="SS"
              min="0"
              max="59"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.sec}
            />
          </div>
          {((errors.hour && touched.hour) ||
            (errors.min && touched.min) ||
            (errors.sec && touched.sec)) && <Error>Invalid time input</Error>}
        </div>
      </div>
      <button type="submit" id="form-submit-btn" hidden>
        submit
      </button>
    </form>
  );
};

export default MatchModal;
