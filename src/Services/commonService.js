import {
  API_ADD_MATCH,
  API_GET_BOOKMAKERSETTINGS,
  API_GET_FANCYSETTINGS,
  API_GET_FANCYUSERS,
  API_GET_FILTER_SPORT,
  API_GET_FILTER_TOURNAMENT,
} from "../utils/api/ApiConstant";
import { defaultAxios } from "../utils/api/axios";
import showToast from "../utils/toastUtil";

export const getAxios = async (url, params) => {
  try {
    const { data } = await defaultAxios.get(url, { params });

    if (data?.status && data?.data) {
      return data?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getAxios failed", error);
  }
};

export const getFilterSport = async (page, limit) => {
  try {
    const { data } = await defaultAxios.get(
      `${API_GET_FILTER_SPORT}?page=${page}&limit=${limit}`,
      {}
    );

    if (data?.auth?.status && data?.auth?.data) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getFilterSport failed", error);
  }
};

export const getFilterTournament = async (id, page, limit) => {
  try {
    const { data } = await defaultAxios.get(
      `${API_GET_FILTER_TOURNAMENT}/${id}?page=${page}&limit=${limit}`,
      {}
    );

    if (data?.auth?.status && data?.auth?.data) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getFilterTournament failed", error);
  }
};

export const getFilterMatches = async (id, page, limit) => {
  try {
    const { data } = await defaultAxios.get(
      `${API_ADD_MATCH}/${id}?page=${page}&limit=${limit}`,
      {}
    );

    if (data?.auth?.status && data?.auth?.data) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getFilterMatches failed", error);
  }
};

export const getBookmakerSettings = async (page, limit) => {
  try {
    const { data } = await defaultAxios.get(
      `${API_GET_BOOKMAKERSETTINGS}?page=${page}&limit=${limit}`,
      {}
    );
    if (data?.status) {
      return data?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getBookmakerSettings error", error?.data?.messge);
  }
};

export const getFancySettings = async (page, limit) => {
  try {
    const { data } = await defaultAxios.get(
      `${API_GET_FANCYSETTINGS}?page=${page}&limit=${limit}`,
      {}
    );
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getFancySettings error", error?.data?.messge);
  }
};

export const getFancyUsers = async (id) => {
  try {
    const { data } = await defaultAxios.get(`${API_GET_FANCYUSERS}/${id}`, {});
    if (data?.auth?.status) {
      return data?.auth?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getFancyUsers error", error?.data?.messge);
  }
};

//url with id
export const putAxios = async (url, payload) => {
  try {
    const { data } = await defaultAxios.put(url, payload);
    const { auth } = data;

    if (auth && auth?.status) {
      showToast.success(auth?.message || "Updated");
      return auth?.status;
    } else {
      showToast.error(auth?.message || "Invalid data");
      return false;
    }
  } catch (error) {
    console.log("putAxios failed", error?.data?.message);
    return false;
  }
};

export const postAxios = async (url, payload) => {
  try {
    const { data } = await defaultAxios.post(url, payload);
    const { auth } = data;

    if (auth && auth?.status) {
      showToast.success(auth?.message || "Success");
      return auth?.status;
    } else {
      showToast.error(auth?.message || "Invalid data");
      return false;
    }
  } catch (error) {
    console.log("putAxios failed", error?.data?.message);
    return false;
  }
};

export const checkUser = async (url, payload) => {
  try {
    const { data } = await defaultAxios.post(url, payload);
    const { auth } = data;

    if (auth && auth?.status) {
      return auth?.status;
    } else {
      return false;
    }
  } catch (error) {
    console.log("putAxios failed", error?.data?.message);
    return false;
  }
};
