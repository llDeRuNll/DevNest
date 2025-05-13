import { LuUser } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";

import { IoColorPaletteOutline } from "react-icons/io5";
import { TfiArrowCircleDown } from "react-icons/tfi";
import s from "./UserPanel.module.css";
import { userLogout } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ModalConfirm from "../ModalConfirm/ModalConfirm";
import Loader from "../Loader/Loader";

import { useUserContext } from "../../utils/UserContext/useUserContext";

import { selectIsLoading } from "../../redux/transactions/selectors";

function UserPanel({ onProfileClick }) {
  const { userSelect, setTheme } = useUserContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useUserContext();

  const isLoggingOut = useSelector(selectIsLoading);

  const handleConfirmLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      closeModal();
      navigate("/");
      toast.success("You have successfully logged out!");
    } catch {
      toast.error("Error logging out.");
    }
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    document.body.setAttribute("data-theme", theme);
  };

  return (
    <>
      {isLoggingOut && (
        <div className={s.loaderOverlay}>
          <Loader />
        </div>
      )}

      <div className={s.dropdownMenu}>
        <div>
          <button className={s.bthnIcon} onClick={onProfileClick}>
            <LuUser className={s.icon} />
            Profile settings
          </button>
        </div>
        <div className={s.selectorWrapper}>
          <label className={s.selectorTitle} htmlFor="theme-switcher">
            <IoColorPaletteOutline className={s.icon} size={18} />
          </label>
          <select
            className={s.selector}
            name="themeSwitcher"
            id="theme-switcher"
            onChange={(e) => handleThemeChange(e.target.value)}
            value={userSelect}
            disabled={isLoggingOut}
          >
            <option className={s.selectorItem} value="dark">
              Dark
            </option>
            <option className={s.selectorItem} value="blue">
              Blue
            </option>
          </select>
          <TfiArrowCircleDown className={s.selectorIcon} />
        </div>
        <div>
          <button className={s.bthnIcon} onClick={openModal}>
            <CiLogout className={s.icon} />
            Log out
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ModalConfirm
          title="Are you sure you want to log out?"
          confirmButton="Yes, log out"
          confirmFc={handleConfirmLogout}
        />
      )}
    </>
  );
}

export default UserPanel;
