import toast from "react-hot-toast";

const showToast = {
  success: (message = "Success", options = {}) => {
    toast.success(message, {
      duration: 3000,
      position: "top-center",
      ...options,
    });
  },
  error: (message = "Something went wrong", options = {}) => {
    toast.error(message, {
      duration: 3000,
      position: "top-center",
      ...options,
    });
  },
  info: (message, options = {}) => {
    toast(message, {
      icon: "ℹ️",
      duration: 3000,
      position: "top-center",
      ...options,
    });
  },
  loading: (message, options = {}) => {
    toast.loading(message, {
      position: "top-center",
      ...options,
    });
  },
  promise: (promise, { loading, success, error }, options = {}) => {
    toast.promise(
      promise,
      {
        loading,
        success,
        error,
      },
      {
        position: "top-center",
        ...options,
      }
    );
  },
};

export default showToast;
