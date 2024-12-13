import { useState, useCallback } from "react";
import { defaultAxios } from "../utils/api/axios";
import { useNavigate } from "react-router-dom";

export const useSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const getAPI = useCallback(async (url, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await defaultAxios.get(url, { params });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const postAPI = useCallback(async (url, payload = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await defaultAxios.post(url, payload);

      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getAPI, postAPI, data, loading, error, navigate };
};
