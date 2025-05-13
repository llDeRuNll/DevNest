import { LuUser } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useModal } from "../../utils/Modal/useModal";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import Loader from "../Loader/Loader";
import { userLogout } from "../../redux/auth/operations";

import s from "./UserPanel.module.css";
import { selectIsLoading } from "../../redux/transactions/selectors";

function UserPanel({ onProfileClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();

  const isLoggingOut = useSelector(selectIsLoading);

  const handleConfirmLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      closeModal();
      navigate("/");
      toast.success("You have successfully logged out!");
    } catch {
      toast.error("Error logging out.");
    }
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
        <div>
          <button className={s.bthnIcon} onClick={openModal}>
            <CiLogout className={s.icon} />
            Log out
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ModalConfirm
          title="Are you sure you want to log out?"
          confirmButton="Yes, log out"
          confirmFc={handleConfirmLogout}
        />
      )}
    </>
  );
}

export default UserPanel;
