import { API_LOGIN } from "../../utils/api/ApiConstant";
import { defaultAxios } from "../../utils/api/axios";
import showToast from "../../utils/toastUtil";
import { userAction } from "./user-slice";
import { uiActions } from "../ui/ui-slice";

export const loginUser = async (dispatch, payload) => {
  try {
    dispatch(uiActions.setLoading(true));
    const { data } = await defaultAxios.post(API_LOGIN, payload);
    if (data?.auth?.status) {
      dispatch(userAction.setToken(data?.auth?.token));
      dispatch(userAction.updateUser(data?.auth?.data));
      dispatch(uiActions.setHeading("Dashboard"));
      showToast.success(data?.auth?.message);
    } else {
      showToast.error(data?.auth?.message);
    }
    dispatch(uiActions.setLoading(false));
  } catch (err) {
    dispatch(uiActions.setLoading(false));
    console.error("Login failed:", err);
  }
};

export const logoutUser = async (dispatch) => {
  try {
    await dispatch(userAction.setToken(""));
    await dispatch(userAction.updateUser({}));
    showToast.success("Logout.");
  } catch (error) {
    showToast.error(error?.data?.message);
  }
};
