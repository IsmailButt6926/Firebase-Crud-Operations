import { toast } from "react-toastify";

const ShowToast = (message: string, type: string) => {
  if (type === "success") {
    toast.success(message);
    return;
  } else if (type === "error") {
    console.log("error");
    toast.error(message);
    return;
  }
};
export default ShowToast;
