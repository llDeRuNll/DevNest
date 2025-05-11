import React from "react";
import s from "./UserSetsModal.module.css";
import { LuUser } from "react-icons/lu";
function UserSetsModal({ onClose }) {
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}>
          ✕
        </button>
        <p className={s.title}>Profile settings</p>

        <div className={s.avatarSection}>
          <div className={s.avatarCircle}>
            <span className={s.avatarIcon}>
              <LuUser />
            </span>
          </div>
          <div className={s.avatarBtns}>
            <button className={s.grayBtn}>Upload new photo</button>
            <button className={s.grayBtn}>Remove</button>
          </div>
        </div>

        <div className={s.formGroup}>
          <select className={s.select}>
            <option value="uah">₴ UAH</option>
            <option value="usd">$ USD</option>
            <option value="eur">€ EUR</option>
          </select>

          <input type="text" className={s.input} placeholder="Alex Rybachok" />
        </div>

        <button className={s.saveBtn}>Save</button>
      </div>
    </div>
  );
}

export default UserSetsModal;
