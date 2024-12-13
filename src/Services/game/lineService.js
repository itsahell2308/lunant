import { defaultAxios } from "../../utils/api/axios";
import { API_GET_LINE } from "../../utils/api/ApiConstant";

export const getLine = async ({ payload }) => {
  try {
    const { data } = await defaultAxios.post(API_GET_LINE, payload);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getsport error", error?.data?.messge);
  }
};
