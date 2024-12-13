import { defaultAxios } from "../../utils/api/axios";
import showToast from "../../utils/toastUtil";

export const getAllSports = async (url, payload) => {
  try {
    const { data } = await defaultAxios.post(url, payload);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getsport error", error?.data?.messge);
  }
};

export const postApiSport = async (url, payload) => {
  try {
    const { data } = await defaultAxios.post(url, payload);
    if (data?.auth?.status) {
      showToast.success(data?.auth?.message || "Success");
      return data?.auth?.status;
    } else {
      showToast.error(data?.auth?.message || "Invalid data");
      return false;
    }
  } catch (error) {
    console.log("postSport error", error?.data?.messge);
    return false;
  }
};

export const putApiSport = async (url, payload) => {
  try {
    const { data } = await defaultAxios.put(url, payload);

    if (data?.auth?.status) {
      showToast.success(data?.auth?.message || "Success");
      return data?.auth?.status;
    } else {
      showToast.error(data?.auth?.message || "Invalid data");
      return false;
    }
  } catch (error) {
    if (error?.status === 403 && !error?.response?.data?.status) {
      showToast.error(error?.response?.data?.message || "Sport not update");
    }
    console.log("postSport error", error);
    return false;
  }
};
