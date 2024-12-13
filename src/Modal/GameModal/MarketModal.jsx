import React from "react";
import { useFormik } from "formik";
import { CustomSelect, Error, Label } from "../../Components";
import { useQuery } from "@tanstack/react-query";
import {
  getFilterMatches,
  getFilterSport,
  getFilterTournament,
} from "../../Services/commonService";
import { MarketSchema } from "../../Schema/Game/MarketSchema";
import { addMarket } from "../../Services/game/marketServices";

const MarketModal = ({ handleShowHide }) => {
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
      match: null,
      marketType: null,
    },
    validationSchema: MarketSchema,
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

      const res = await addMarket(body);
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

  const { data: matchData } = useQuery({
    queryKey: ["filterMatch", values.tournament],
    queryFn: async () =>
      values.tournament?.value
        ? await getFilterMatches(values.tournament.value, 1, 25)
        : [],
    staleTime: 300000,
    enabled: !!values.tournament?.value, // Only fetch Matches when a tournaments is selected
  });

  const sportOptions =
    sportData?.docs
      ?.filter((item) => item.isActive)
      ?.map((item) => ({ value: item.id, label: item.name })) || [];

  const tournamentOptions =
    tournamentData?.docs
      ?.filter((item) => item.isActive)
      ?.map((item) => ({ value: item.id, label: item.name })) || [];

  const matchOptions =
    matchData?.docs
      ?.filter((item) => item.isActive)
      ?.map((item) => ({ value: item.id, label: item.name })) || [];

  const marketTypeOption = [
    // {
    //   id: "5ebc1code68br4bik5b3035",
    //   name: "Match Odds",
    // },
    {
      value: "5ebc1code68br4bik5b1808",
      label: "Fancy",
    },
    {
      value: "5ebc1code68br4bik5b0810",
      label: "Bookmaker",
    },
    {
      value: "5ebc1code68br4bik5b0812",
      label: "OddEven",
    },
    // {
    //   id: "5ebc1code68br4bik5b0811",
    //   name: "Line",
    // },
    {
      value: "5ebc1code68br4bik5b0814",
      label: "Cup",
    },
  ];

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
          />
          {errors.tournament && touched.tournament && (
            <Error>{errors.tournament}</Error>
          )}
        </div>

        <div className="col-md-6">
          <Label htmlFor="match" className="form-label" isRequired={true}>
            Matches
          </Label>
          <CustomSelect
            options={matchOptions}
            value={values.match}
            onChange={(selectedOption) =>
              setFieldValue("match", selectedOption)
            }
            placeholder="Select Match"
            isMulti={false}
          />
          {errors.match && touched.match && <Error>{errors.match}</Error>}
        </div>
        <div className="col-md-6">
          <Label htmlFor="marketType" className="form-label" isRequired={true}>
            Market Name
          </Label>
          <CustomSelect
            options={marketTypeOption}
            value={values.marketType}
            onChange={(selectedOption) =>
              setFieldValue("marketType", selectedOption)
            }
            placeholder="Select Market"
            isMulti={false}
          />
          {errors.marketType && touched.marketType && (
            <Error>{errors.marketType}</Error>
          )}
        </div>
      </div>
      <button type="submit" id="form-submit-btn" hidden>
        submit
      </button>
    </form>
  );
};

export default MarketModal;
