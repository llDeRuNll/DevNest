import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import s from "./UserPanel.module.css";

const UserPanel = ({ onOpenModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(userLogout()).unwrap();
    navigate("/");
  };

  return (
    <div className={s.userPanel}>
      <button className={s.userPanelBtn} onClick={onOpenModal}>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3337 14.5V13.1667C13.3337 12.4594 13.0527 11.7811 12.5526 11.281C12.0525 10.781 11.3742 10.5 10.667 10.5H5.33366C4.62641 10.5 3.94814 10.781 3.44804 11.281C2.94794 11.7811 2.66699 12.4594 2.66699 13.1667V14.5"
            stroke="#838383"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.99967 7.83333C9.47243 7.83333 10.6663 6.63943 10.6663 5.16667C10.6663 3.69391 9.47243 2.5 7.99967 2.5C6.52692 2.5 5.33301 3.69391 5.33301 5.16667C5.33301 6.63943 6.52692 7.83333 7.99967 7.83333Z"
            stroke="#838383"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Profile settings
      </button>
      <button className={s.userPanelBtn} onClick={handleLogout}>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V3.83333C2 3.47971 2.14048 3.14057 2.39052 2.89052C2.64057 2.64048 2.97971 2.5 3.33333 2.5H6"
            stroke="#838383"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.667 11.8334L14.0003 8.50002L10.667 5.16669"
            stroke="#838383"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 8.5H6"
            stroke="#838383"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserPanel;
