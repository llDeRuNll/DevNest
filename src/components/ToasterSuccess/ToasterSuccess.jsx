import { Slide, toast } from "react-toastify";
import s from "./ToasterSuccess.module.css";
import { BiHappyBeaming } from "react-icons/bi";
const ToasterSuccess = () => {
  toast.success("Operation completed successfully", {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: s.customToastDelete,
    theme: "light",
    transition: Slide,
    icon: <BiHappyBeaming className={s.icon} />,
  });
};

export default ToasterSuccess;
