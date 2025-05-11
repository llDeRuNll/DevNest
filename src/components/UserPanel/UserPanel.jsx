import React from "react";
import { LuUser } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import s from "./UserPanel.module.css";
import { userLogout } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserPanel({ onProfileClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(userLogout()).unwrap();
    navigate("/");
  };
  return (
    <div className={s.dropdownMenu}>
      <div>
        <button className={s.bthnIcon} onClick={onProfileClick}>
          <LuUser className={s.icon} />
          Profile settings
        </button>
      </div>
      <div>
        <button className={s.bthnIcon} onClick={handleLogout}>
          <CiLogout className={s.icon} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default UserPanel;
