import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { Button, Error, Label } from "../../../Components";
import { checkUser, putAxios } from "../../../Services/commonService";
import {
  API_POST_CHECK_USER,
  API_UPDATE_TOURNAMENT,
} from "../../../utils/api/ApiConstant";
import { uiActions } from "../../../store/ui/ui-slice";
import { featureActions } from "../../../store/feature/feature-slice";

const LimitModal = ({ rowData, handleShowHide }) => {
  const { settings } = rowData;
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      line: {
        betDelay: settings?.line?.betDelay || 0,
        maxStack: settings?.line?.maxStack || 0,
        maxProfit: settings?.line?.maxProfit || 0,
      },
      fancy: {
        betDelay: settings?.fancy?.betDelay || 0,
        maxStack: settings?.fancy?.maxStack || 0,
        maxProfit: settings?.fancy?.maxProfit || 0,
      },
      player: {
        betDelay: settings?.player?.betDelay || 0,
        maxStack: settings?.player?.maxStack || 0,
        maxProfit: settings?.player?.maxProfit || 0,
      },
      overs: {
        betDelay: settings?.overs?.betDelay || 0,
        maxStack: settings?.overs?.maxStack || 0,
        maxProfit: settings?.overs?.maxProfit || 0,
      },
      other: {
        betDelay: settings?.other?.betDelay || 0,
        maxStack: settings?.other?.maxStack || 0,
        maxProfit: settings?.other?.maxProfit || 0,
      },
      onlyOver: {
        betDelay: settings?.onlyOver?.betDelay || 0,
        maxStack: settings?.onlyOver?.maxStack || 0,
        maxProfit: settings?.onlyOver?.maxProfit || 0,
      },
      matchOdds: {
        maxStack: settings?.matchOdds?.maxStack || 0,
        maxProfit: settings?.matchOdds?.maxProfit || 0,
      },
      bookmaker: {
        maxStack: settings?.bookmaker?.maxStack || 0,
        maxProfit: settings?.bookmaker?.maxProfit || 0,
      },
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      dispatch(uiActions.setLoading(true));

      const userPayload = { id: user.user_id, password: values.password };

      console.log("🚀 ~ onSubmit: ~ userPayload:", userPayload);
      const userRes = await checkUser(API_POST_CHECK_USER, userPayload);
      if (userRes) {
        const limitPayload = {
          ...rowData,
          settings: { ...values },
        };
        const url = `${API_UPDATE_TOURNAMENT}/${rowData?._id}`;
        await putAxios(url, limitPayload);
        dispatch(featureActions.setTournament());
      }
      dispatch(uiActions.setLoading(false));
      handleShowHide();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="row m-0 p-0">
        <div className="col-md-6 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            market max stack
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="matchOdds.maxStack"
            onChange={handleChange}
            value={values.matchOdds.maxStack}
          />
        </div>
        <div className="col-md-6 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            market max profit
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="matchOdds.maxProfit"
            onChange={handleChange}
            value={values.matchOdds.maxProfit}
          />
        </div>

        <div className="col-md-6 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            book max stack
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="bookmaker.maxStack"
            onChange={handleChange}
            value={values.bookmaker.maxStack}
          />
        </div>
        <div className="col-md-6 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            book max profit
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="bookmaker.maxProfit"
            onChange={handleChange}
            value={values.bookmaker.maxProfit}
          />
        </div>

        <div className="col-md-5 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            max stack
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="overs.betDelay"
            onChange={handleChange}
            value={values.overs.betDelay}
          />
        </div>
        <div className="col-md-5 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            max profit
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="overs.maxProfit"
            onChange={handleChange}
            value={values.overs.maxProfit}
          />
        </div>
        <div className="col-md-2 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            bat delay
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="overs.maxStack"
            onChange={handleChange}
            value={values.overs.maxStack}
          />
        </div>

        <div className="col-md-5 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            max stack
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="onlyOver.betDelay"
            onChange={handleChange}
            value={values.onlyOver.betDelay}
          />
        </div>
        <div className="col-md-5 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            max profit
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="onlyOver.maxProfit"
            onChange={handleChange}
            value={values.onlyOver.maxProfit}
          />
        </div>
        <div className="col-md-2 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            bat delay
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="onlyOver.maxStack"
            onChange={handleChange}
            value={values.onlyOver.maxStack}
          />
        </div>

        <div className="col-md-5 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            max stack
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="player.betDelay"
            onChange={handleChange}
            value={values.player.betDelay}
          />
        </div>
        <div className="col-md-5 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            max profit
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="player.maxProfit"
            onChange={handleChange}
            value={values.player.maxProfit}
          />
        </div>
        <div className="col-md-2 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            bat delay
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="player.maxStack"
            onChange={handleChange}
            value={values.player.maxStack}
          />
        </div>

        <div className="col-md-5 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            max stack
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="other.betDelay"
            onChange={handleChange}
            value={values.other.betDelay}
          />
        </div>
        <div className="col-md-5 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            max profit
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="other.maxProfit"
            onChange={handleChange}
            value={values.other.maxProfit}
          />
        </div>
        <div className="col-md-2 m-0 p-1">
          <Label htmlFor="market_max_stach" className="form-label">
            bat delay
          </Label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number"
            name="other.maxStack"
            onChange={handleChange}
            value={values.other.maxStack}
          />
        </div>
        <div className="col-md-12 m-0 p-1">
          <Label htmlFor="password" className="form-label">
            Transaction Password
          </Label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && touched.password && (
            <Error>{errors.password}</Error>
          )}
        </div>
      </div>

      <Button type="submit" id="form-submit-btn" isHidden={true}>
        Submit
      </Button>
    </form>
  );
};

export default LimitModal;
