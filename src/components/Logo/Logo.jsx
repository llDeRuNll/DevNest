import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./Logo.module.css";

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const redirectPath = isLoggedIn ? "/main-transactions" : "/";

  return (
    <Link to={redirectPath} className={styles.logo}>
      <span className={styles.logoWrap}>
        <svg
          className={styles.logoIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="27"
          height="27"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M13 7h-2v6h6v-2h-4z" />
        </svg>
      </span>
      <span className={styles.logoText}>ExpenseTracker</span>
    </Link>
  );
};

export default Logo;
