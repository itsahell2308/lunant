import axios from "axios";
import { APIBaseUrl } from "../constance";
import store from "../../store";
import { userAction } from "../../store/user/user-slice";

// LocalStorageServic

export const defaultAxios = axios.create({
  baseURL: APIBaseUrl,
});

// Add a request interceptor
defaultAxios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user?.token || "";
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

defaultAxios.interceptors.response.use(
  (response) => {
    //success status
    if (response.status === 200) {
      return response;
    } else {
      return Promise.reject({ messages: ["got errors"] });
    }
  },
  (error) => {
    //unauthorised error
    if (error.response && error.response.status === 401) {
      store.dispatch(userAction.clearUser());
    }
    //internal server error
    else if (error.response && error.response.status === 500) {
      return Promise.reject(error.response);
    } else return Promise.reject(error);
  }
);
