import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
import { TfiArrowCircleDown } from "react-icons/tfi";
import toast from "react-hot-toast";

import s from "./UserPanel.module.css";
import { userLogout } from "../../redux/auth/operations";
import Loader from "../Loader/Loader";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { useUserContext } from "../../utils/UserContext/useUserContext";
import { selectIsLoading } from "../../redux/transactions/selectors";

const UserPanel = ({ onProfileClick }) => {
  const { userSelect, setTheme } = useUserContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggingOut = useSelector(selectIsLoading);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      setIsLogoutModalOpen(false);
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
            id="theme-switcher"
            className={s.selector}
            value={userSelect}
            onChange={(e) => handleThemeChange(e.target.value)}
            disabled={isLoggingOut}
          >
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
          </select>
          <TfiArrowCircleDown className={s.selectorIcon} />
        </div>
        <div>
          <button
            className={s.bthnIcon}
            onClick={() => setIsLogoutModalOpen(true)}
            disabled={isLoggingOut}
          >
            <CiLogout className={s.icon} />
            Log out
          </button>
        </div>
      </div>

      {isLogoutModalOpen && (
        <ModalConfirm
          title="Are you sure you want to log out?"
          confirmButton="Yes, log out"
          confirmFc={handleConfirmLogout}
          cancelFc={() => setIsLogoutModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserPanel;
