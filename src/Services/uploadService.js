import { defaultAxios } from "../utils/api/axios";
import showToast from "../utils/toastUtil";

export const postApiUpload = async (url, payload) => {
  try {
    const { data } = await defaultAxios.post(url, payload);

    if (data?.status) {
      showToast.success(data?.message || "Succecss");
      return data?.status;
    } else {
      showToast.error(data?.message || "Invalid data");
      return false;
    }
  } catch (error) {
    console.log("getAxios failed", error?.data?.message);
    return false;
  }
};
