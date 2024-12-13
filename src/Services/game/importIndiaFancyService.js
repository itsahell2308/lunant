import { defaultAxios } from "../../utils/api/axios";
import { API_GET_IMPORT_INDIA_FANCY } from "../../utils/api/ApiConstant";

export const getImportIndiaFancy = async () => {
  try {
    const { data } = await defaultAxios.get(API_GET_IMPORT_INDIA_FANCY, {});
    if (data?.status) {
      return data?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getImportIndiaFancy error", error?.data?.messge);
  }
};
