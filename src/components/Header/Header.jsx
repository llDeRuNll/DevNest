import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
// import logoIcon from "../../img/logo.svg";
// import avatarIcon from "../../img/avatar.jpg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={styles.header}>
      <Link to="/main" className={styles.logo}>
        {/* <img src={logoIcon} alt="Logo" /> */}
        <span>EXPENSETRACKER</span>
      </Link>

      <nav className={styles.nav}>
        <Link to="/expenses" className={styles.navLink}>
          All Expense
        </Link>
        <Link to="/income" className={styles.navLink}>
          All Income
        </Link>
      </nav>

      <div className={styles.userBar}>
        {/* <img src={avatarIcon} alt="User" className={styles.avatar} /> */}
        <span className={styles.userName}>Alex Rybachok</span>
      </div>

      <button className={styles.burger} onClick={toggleMenu}>
        ☰
      </button>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <button className={styles.close} onClick={toggleMenu}>
            ✕
          </button>

          <div className={styles.userInfo}>
            {/* <img src={avatarIcon} alt="User" className={styles.avatar} /> */}
            <span className={styles.userName}>Alex Rybachok</span>
          </div>

          <ul className={styles.mobileNav}>
            <li>
              <Link to="/profile">Profile settings</Link>
            </li>
            <li>
              <Link to="/logout">Log out</Link>
            </li>
          </ul>

          <div className={styles.switcher}>
            <Link to="/expenses" className={styles.switchBtn}>
              All Expense
            </Link>
            <Link to="/income" className={styles.switchBtn}>
              All Income
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
