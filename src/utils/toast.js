import { Bounce, toast } from "react-toastify";

export const ToastSuccess = (message, time) => {
  toast["success"](message || "success", {
    position: "top-right",
    autoClose: time || 1000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    closeButton: true,
    transition: Bounce,
    progress: undefined,
    closeOnClick: false,
    theme: "dark",
    style: {
      fontSize: 16,
      color: "#fff",
    },
  });
};

export const ToastError = (message, time) => {
  toast["error"](message || "error", {
    position: "top-right",
    autoClose: time || 2000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: false,
    closeButton: true,
    transition: Bounce,
    progress: undefined,
    closeOnClick: false,
    theme: "dark",
    style: {
      fontSize: 16,
      color: "#fff",
    },
  });
};

export const ToastWarning = (message, time) => {
  toast["warning"](message || "warning", {
    position: "top-right",
    autoClose: time || 2000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: false,
    closeButton: true,
    transition: Bounce,
    progress: undefined,
    closeOnClick: false,
    theme: "dark",
    style: {
      fontSize: 16,
      color: "#fff",
    },
  });
};

// export const ToastLoading = (message, time) => {
//   toast["loading"](message || "loading", {
//     position: "top-right",
//     autoClose: time || 2500,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// };
