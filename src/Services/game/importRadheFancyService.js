import { defaultAxios } from "../../utils/api/axios";
import { API_GET_IMPORTRADHEFANCY } from "../../utils/api/ApiConstant";

export const getRadheFancy = async () => {
  try {
    const { data } = await defaultAxios.get(API_GET_IMPORTRADHEFANCY, {});
    if (data?.status) {
      return data?.data;  
    } else {
      return [];
    }
  } catch (error) {
    console.log("getBookmaker error", error?.data?.messge);
  }
};
