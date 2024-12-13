import { defaultAxios } from "../../utils/api/axios";
import {
  API_ADD_CREATEFANCY,
  API_GET_MARKET,
} from "../../utils/api/ApiConstant";

export const getFancy = async ({ payload }) => {
  try {
    const { data } = await defaultAxios.post(API_GET_MARKET, payload);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getsport error", error);
  }
};

export const addFancy = async (body) => {
  try {
    const { data } = await defaultAxios.post(API_ADD_CREATEFANCY, body);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("addFancy error", error);
  }
};
