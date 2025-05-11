import TransactionsHistoryNav from "../TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "../UserBarBtn/UserBarBtn";
import s from "./BurgerMenu.module.css";

const BurgerMenu = ({ onOpenModal, onClose }) => {
  return (
    <div
      className={s.backdrop}
      onClick={(e) => e.target.classList.contains(s.backdrop) && onClose()}
    >
      <div className={s.burgerMenu}>
        <button onClick={onClose} className={s.closeBtn}>
          <svg
            width="27"
            height="28"
            viewBox="0 0 27 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.78221 27.1851L0 23.2472L9.77967 13.8541L0.38649 4.07439L4.10796 0.5L13.5011 10.2797L23.0212 1.13587L26.8034 5.0737L17.2833 14.2175L26.6765 23.9972L22.955 27.5716L13.5619 17.7919L3.78221 27.1851Z"
              fill="#0C0D0D"
            />
          </svg>
        </button>
        <UserBarBtn onOpenModal={onOpenModal} />
        <TransactionsHistoryNav />
      </div>
    </div>
  );
};

export default BurgerMenu;
