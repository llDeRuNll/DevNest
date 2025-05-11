import React, { useState, useRef, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
// import { useSelector } from "react-redux";

import s from "./UserBarBtn.module.css";
import UserPanel from "../UserPanel/UserPanel";
import UserSetsModal from "../UserSetsModal/UserSetsModal";

function UserBarBtn() {
  // const { user } = useSelector((state) => state.user);
  const user = {};
  const defoltImg = "https://www.w3schools.com/howto/img_avatar.png";
  const defoltName = "Guest";
  const imgSrc = user.avatar || defoltImg;
  const name = user.name || defoltName;

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const openModal = () => {
    setIsModalOpen(true);
    setIsOpen(false); // Закрываем меню
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

  return (
    <>
      <div className={s.userContainer} ref={menuRef}>
        <div onClick={toggleMenu} className={s.userBar}>
          <img src={imgSrc} alt={name} className={s.userImg} />
          <p className={s.userName}>{name}</p>
          <AiOutlineDown className={s.vector} />
        </div>

        {isOpen && <UserPanel onProfileClick={openModal} />}
      </div>

      {isModalOpen && <UserSetsModal onClose={closeModal} />}
    </>
  );
}
export default UserBarBtn;
