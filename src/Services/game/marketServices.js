import { defaultAxios } from "../../utils/api/axios";
import {
  API_ADD_MARKET,
  API_EDIT_MARKET,
  API_GET_MARKET,
} from "../../utils/api/ApiConstant";

export const getMarket = async ({ payload }) => {
  try {
    const { data } = await defaultAxios.post(API_GET_MARKET, payload);
    // console.log("data", data);

    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getMarket error", error);
  }
};

export const addMarket = async (body) => {
  try {
    const { data } = await defaultAxios.post(API_ADD_MARKET, body);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("addMarket error", error?.data?.messge);
  }
};

export const editMarket = async (id, body) => {
  try {
    const { data } = await defaultAxios.put(`${API_EDIT_MARKET}/${id}`, body);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("editMarket error", error?.data?.messge);
  }
};

export const putApiMarket = async (url, payload) => {
  try {
    const { data } = await defaultAxios.put(url, payload);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("editMarket error", error?.data?.messge);
  }
};
