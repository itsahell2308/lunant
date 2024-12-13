import { useState, useCallback } from "react";
import { defaultAxios } from "../utils/api/axios";

export const useFormData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fileUpload = useCallback(async (url, files, additionalData = {}) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      //handle single or multiple files
      if (Array.isArray(files)) {
        files.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });
      } else {
        formData.append("file", files);
      }

      // Append additional fields if needed
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });

      const response = await defaultAxios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fileUpload, data, loading, error };
};
