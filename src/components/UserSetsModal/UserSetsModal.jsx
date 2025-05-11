import React, { useRef, useState } from "react";
import s from "./UserSetsModal.module.css";
import { LuUser } from "react-icons/lu";

function UserSetsModal({ onClose }) {
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);
    }
  };

  const handleRemove = () => {
    setAvatar(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}>
          ✕
        </button>
        <p className={s.title}>Profile settings</p>

        <div className={s.avatarSection}>
          <div className={s.avatarCircle}>
            {avatar ? (
              <img src={avatar} alt="Avatar" className={s.avatarImg} />
            ) : (
              <span className={s.avatarIcon}>
                <LuUser />
              </span>
            )}
          </div>
          <div className={s.avatarBtns}>
            <button className={s.grayBtn} onClick={handleUploadClick}>
              Upload new photo
            </button>
            <button className={s.grayBtn} onClick={handleRemove}>
              Remove
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
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
