import React from "react";
import styles from "./BurgerMenuBtn.module.css";

const BurgerMenuBtn = ({ onClick }) => {
  return (
    <button className={styles.burgerBtn} onClick={onClick}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 15.5833H38.5M5.5 28.4167H38.5"
          stroke="#FAFAFA"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default BurgerMenuBtn;
