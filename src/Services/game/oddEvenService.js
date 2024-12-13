import { defaultAxios } from "../../utils/api/axios";
import { API_GET_ODDEVEN } from "../../utils/api/ApiConstant";

export const getOddEven = async ({ payload }) => {
  try {
    const { data } = await defaultAxios.post(API_GET_ODDEVEN, payload);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getBookmaker error", error?.data?.messge);
  }
};
