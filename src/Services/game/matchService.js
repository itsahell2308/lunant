import { defaultAxios } from "../../utils/api/axios";
import {
  API_ADD_MATCH,
  API_EDIT_EDITMATCHLIVETV,
  API_EDIT_IMPORTFANCY,
  API_GET_GETALLCHANNELS,
  API_GET_MATCH,
} from "../../utils/api/ApiConstant";

export const getMatches = async ({ payload }) => {
  try {
    const { data } = await defaultAxios.post(API_GET_MATCH, payload);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getsport error", error);
  }
};

export const addMatch = async (body) => {
  try {
    const { data } = await defaultAxios.post(API_ADD_MATCH, body);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("addMatch error", error);
  }
};

export const editMatch = async (id, body) => {
  try {
    const { data } = await defaultAxios.put(`${API_ADD_MATCH}/${id}`, body);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("editMatch error", error);
  }
};

export const importMatchFancy = async (body) => {
  try {
    const { data } = await defaultAxios.post(`${API_EDIT_IMPORTFANCY}`, body);
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("editMatch error", error);
  }
};

export const getAllChannels = async () => {
  try {
    const { data } = await defaultAxios.get(`${API_GET_GETALLCHANNELS}`, {});
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getAllChannels", error);
  }
};

export const editLiveTvUrl = async (id, body) => {
  try {
    const { data } = await defaultAxios.put(
      `${API_EDIT_EDITMATCHLIVETV}/${id}`,
      body
    );
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("editLiveTvUrl error", error);
  }
};
