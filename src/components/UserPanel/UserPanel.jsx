import React from "react";
import { LuUser } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import s from "./UserPanel.module.css";
import { userLogout } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UserPanel({ onProfileClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      navigate("/");
      toast.success("You have successfully logged out!");
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  return (
    <div className={s.dropdownMenu}>
      <div>
        <button
          className={s.bthnIcon}
          onClick={onProfileClick}
          aria-label="Open profile settings"
        >
          <LuUser className={s.icon} />
          Profile settings
        </button>
      </div>
      <div>
        <button
          className={s.bthnIcon}
          onClick={handleLogout}
          aria-label="Log out"
        >
          <CiLogout className={s.icon} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default UserPanel;
