import { defaultAxios } from "../../utils/api/axios";
import { API_GET_BOOKMAKER } from "../../utils/api/ApiConstant";

export const getBookmaker = async ({ payload }) => {
  try {
    const { data } = await defaultAxios.post(API_GET_BOOKMAKER, payload);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getBookmaker error", error?.data?.messge);
  }
};
