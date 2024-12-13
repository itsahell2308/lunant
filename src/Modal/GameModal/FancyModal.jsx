import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { CustomSelect, Error, Label } from "../../Components";
import { useQuery } from "@tanstack/react-query";
import {
  getFancySettings,
  getFancyUsers,
  getFilterMatches,
  getFilterSport,
  getFilterTournament,
} from "../../Services/commonService";
import { MarketSchema } from "../../Schema/Game/MarketSchema";
import { generateRandomId } from "../../helper/common";
import { addFancy } from "../../Services/game/fancyServices";

const FancyModal = ({ handleShowHide }) => {
  const { user } = useSelector((state) => state.user);

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
      assignTo: null,
      fancyName: "",
    },
    validationSchema: MarketSchema,
    onSubmit: async (values) => {
      const obj = {
        fancyId: generateRandomId(),
        fancyName: values?.fancyName,
        tempAsiignToName: [
          {
            id: values?.assignTo?.value,
            itemName: values?.assignTo?.label,
            userType: values?.assignTo?.userType,
          },
        ],
        assignTo: {
          id: values?.assignTo?.value,
          name: values?.assignTo?.label,
        },
        fancySetting: {
          maxStack: 100000,
          minStack: 10,
          maxProfit: 2000000,
          betDelay: 0,
          maxStackPerOdds: 200000,
        },
        fancyConfigurationSetting: {
          ballStart: 30,
          rateRange: 20,
          rateDiffrence: 1,
        },
        marketId: generateRandomId(),
        marketType: "Fancy",
        marketTypeId: "5ebc1code68br4bik5b1808",
        marketStartTime: new Date(Date.now()).toISOString(),
        totalMatched: 0,
        gameSetting: null,
        bookmakerSetting: null,
        isActive: false,
        marketStatus: {
          id: "MS081893",
          name: "OPEN",
        },
        sport: {
          id: values?.sports?.value,
          name: values?.sports?.label,
        },
        tournament: {
          id: values?.tournament?.value,
          name: values?.tournament?.label,
        },
        match: {
          id: values?.match?.value,
          name: values?.match?.label,
        },
      };
      const res = await addFancy([obj]);
      if (res && res.length > 0) {
        handleShowHide();
      }
    },
  });

  const { data: sportData } = useQuery({
    queryKey: ["filterSport"],
    queryFn: async () => await getFilterSport(1, -1),
    staleTime: 300000,
  });

  const { data: fancySettings } = useQuery({
    queryKey: ["fancySettings"],
    queryFn: async () => await getFancySettings(1, -1),
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

  const { data: fancyUsers } = useQuery({
    queryKey: ["fancyUser"],
    queryFn: async () => getFancyUsers(user?.user_id),
    staleTime: 300000,
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

  const fancyUserOption =
    fancyUsers?.map((item) => ({
      value: item._id,
      label: item.name,
      userType: item.userType,
    })) || [];

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
          <Label htmlFor="assignTo" className="form-label" isRequired={true}>
            Assign To
          </Label>
          <CustomSelect
            options={fancyUserOption}
            value={values.assignTo}
            onChange={(selectedOption) =>
              setFieldValue("assignTo", selectedOption)
            }
            placeholder="Select User"
            isMulti={false}
          />
          {errors.assignTo && touched.assignTo && (
            <Error>{errors.assignTo}</Error>
          )}
        </div>
        <div className="col-md-6">
          <Label htmlFor="fancyName" className="form-label" isRequired={true}>
            Match Name
          </Label>
          <input
            type="text"
            className="form-control"
            name="fancyName"
            id="fancyName"
            placeholder="Enter name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fancyName}
          />
          {errors.fancyName && touched.fancyName && (
            <Error>{errors.fancyName}</Error>
          )}
        </div>
      </div>
      <button type="submit" id="form-submit-btn" hidden>
        submit
      </button>
    </form>
  );
};

export default FancyModal;
