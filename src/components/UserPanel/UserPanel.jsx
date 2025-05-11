import React from "react";
import { LuUser } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import s from "./UserPanel.module.css";
function UserPanel({ onProfileClick }) {
  return (
    <div className={s.dropdownMenu}>
      <div>
        <button className={s.bthnIcon} onClick={onProfileClick}>
          <LuUser className={s.icon} />
          Profile settings
        </button>
      </div>
      <div>
        <button className={s.bthnIcon}>
          <CiLogout className={s.icon} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default UserPanel;
