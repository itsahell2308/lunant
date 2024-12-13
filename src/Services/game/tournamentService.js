import { defaultAxios } from "../../utils/api/axios";
import { API_GET_TOURNAMENT } from "../../utils/api/ApiConstant";
import showToast from "../../utils/toastUtil";

export const getTournaments = async ({ payload }) => {
  try {
    const { data } = await defaultAxios.post(API_GET_TOURNAMENT, payload);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getTournaments error", error?.data?.messge);
  }
};

export const postApiTournament = async (url, payload) => {
  try {
    const { data } = await defaultAxios.post(url, payload);

    if (data?.auth?.status) {
      showToast.success(data?.auth?.message || "Tournament added");
      return data?.auth?.status;
    } else {
      showToast.error(data?.auth?.message || "Invalid data");
      return false;
    }
  } catch (error) {
    if (error?.status === 403 && !error?.response?.data?.status) {
      showToast.error(
        error?.response?.data?.message || "Tournament not update"
      );
    }
    console.log("postApiTournament error", error);
    return false;
  }
};

export const putApiTournament = async (url, payload) => {
  try {
    const { data } = await defaultAxios.put(url, payload);

    if (data?.auth?.status) {
      showToast.success(data?.auth?.message || "Tournament updated");
      return data?.auth?.status;
    } else {
      showToast.error(data?.auth?.message || "Invalid data");
      return false;
    }
  } catch (error) {
    if (error?.status === 403 && !error?.response?.data?.status) {
      showToast.error(
        error?.response?.data?.message || "Tournament not update"
      );
    }
    console.log("putApiTournament error", error);
    return false;
  }
};
