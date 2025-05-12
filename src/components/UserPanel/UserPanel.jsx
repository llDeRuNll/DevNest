import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import s from "./UserPanel.module.css";
import { userLogout } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

function UserPanel({ onProfileClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await dispatch(userLogout()).unwrap();
      navigate("/");
      toast.success("You have successfully logged out!");
    } catch (error) {
      toast.error(error, "Error logging out.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={s.panelContainer}>
      {isLoggingOut && (
        <div className={s.loaderOverlay}>
          <Loader />
        </div>
      )}
      <div className={s.dropdownMenu} aria-hidden={isLoggingOut}>
        <div>
          <button
            className={s.btnIcon}
            onClick={onProfileClick}
            aria-label="Open profile settings"
            disabled={isLoggingOut}
          >
            <LuUser className={s.icon} />
            Profile settings
          </button>
        </div>
        <div>
          <button
            className={s.btnIcon}
            onClick={handleLogout}
            aria-label="Log out"
            disabled={isLoggingOut}
          >
            <CiLogout className={s.icon} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
