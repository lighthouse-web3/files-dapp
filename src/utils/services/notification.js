import { toast } from "react-toastify";

export const notify = (msg, msg_type) => {
  let config = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  };
  msg_type === "error" && toast.error(`${msg}`, config);
  msg_type === "success" && toast.success(`${msg}`, config);
};
