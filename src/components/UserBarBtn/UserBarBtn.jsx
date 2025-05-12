import { useState, useRef, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import s from "./UserBarBtn.module.css";
import UserPanel from "../UserPanel/UserPanel";
import UserSetsModal from "../UserSetsModal/UserSetsModal";
import Loader from "../Loader/Loader";

function UserBarBtn() {
  const { user, isRefreshing } = useSelector((state) => state.auth);
  const defaultName = "Guest";
  const imgSrc = user.avatarUrl ? `${user.avatarUrl}?t=${Date.now()}` : null;
  const name = user.name || defaultName;

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const openModal = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <>
      <div className={s.userContainer} ref={menuRef}>
        <div
          onClick={toggleMenu}
          className={s.userBar}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
        >
          {imgSrc ? (
            <img src={imgSrc} alt={name} className={s.userImg} />
          ) : (
            <span className={s.avatarIcon}>
              <LuUser />
            </span>
          )}
          <p className={s.userName}>{name}</p>
          <AiOutlineDown className={`${s.vector} ${isOpen ? s.rotated : ""}`} />
        </div>
        {isOpen && <UserPanel onProfileClick={openModal} />}
      </div>
      {isModalOpen && <UserSetsModal onClose={closeModal} />}
    </>
  );
}

export default UserBarBtn;
