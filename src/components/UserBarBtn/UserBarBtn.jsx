import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectAvatarUrl } from "../../redux/auth/selectors";
import UserPanel from "../UserPanel/UserPanel";
import s from "./UserBarBtn.module.css";

const UserBarBtn = ({ onOpenModal }) => {
  const user = useSelector(selectUser) || { name: null, avatarUrl: null };
  const avatarUrl = useSelector(selectAvatarUrl);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

  const toggleUserPanel = () => setIsUserPanelOpen((prev) => !prev);

  const avatar = avatarUrl ? (
    <img src={avatarUrl} alt="User Avatar" className={s.avatar} />
  ) : (
    <span className={s.avatarPlaceholder}>
      {typeof user.name === "string" && user.name.length > 0
        ? user.name.charAt(0).toUpperCase()
        : "U"}
    </span>
  );

  return (
    <div className={s.userBarBtnContainer} onClick={toggleUserPanel}>
      <div
        className={s.userBarBtn}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleUserPanel()}
      >
        {avatar}
        <span className={s.userBarBtnName}>{user.name || "User"}</span>
        {isUserPanelOpen && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12.5L10 7.5L15 12.5"
              stroke="#0EF387"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
        {!isUserPanelOpen && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="#0EF387"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>
      {isUserPanelOpen && <UserPanel onOpenModal={onOpenModal} />}
    </div>
  );
};

export default UserBarBtn;
