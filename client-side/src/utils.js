import toast from "react-hot-toast";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    hideProgressBar: false,
    className: "custom-toast",
    autoClose: 3000,
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    hideProgressBar: false,
    className: "custom-toast",
    autoClose: 3000,
  });
};
