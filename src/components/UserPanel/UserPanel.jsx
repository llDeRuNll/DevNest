import React from "react";
import { LuUser } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import s from "./UserPanel.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useModal } from "../../utils/Modal/useModal";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { userLogout } from "../../redux/auth/operations"; // ← добавь вот это

function UserPanel({ onProfileClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleConfirmLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      closeModal();
      navigate("/");
      toast.success("You have successfully logged out!");
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  return (
    <>
      <div className={s.dropdownMenu}>
        <div>
          <button className={s.bthnIcon} onClick={onProfileClick}>
            <LuUser className={s.icon} />
            Profile settings
          </button>
        </div>
        <div>
          <button className={s.bthnIcon} onClick={openModal}>
            <CiLogout className={s.icon} />
            Log out
          </button>
        </div>
      </div>
    </>
  );
}

export default UserPanel;
