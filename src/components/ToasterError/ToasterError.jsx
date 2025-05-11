import { Slide, toast } from "react-toastify";
import s from "./ToasterError.module.css";
import { GiTerror } from "react-icons/gi";

const ToasterError = () => {
  toast.success("Something went wrong,please try again", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: s.customToastDelete,
    theme: "light",
    transition: Slide,
    icon: <GiTerror className={s.icon} />,
  });
};

export default ToasterError;
