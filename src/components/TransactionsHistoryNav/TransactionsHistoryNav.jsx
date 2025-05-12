import { NavLink } from "react-router-dom";
import styles from "./TransactionsHistoryNav.module.css";

const TransactionsHistoryNav = ({ onClick }) => {
  const links = [
    { to: "/transactions/history/expenses", label: "All Expense" },
    { to: "/transactions/history/incomes", label: "All Income" },
  ];

  return (
    <nav className={styles.nav}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
          onClick={onClick}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default TransactionsHistoryNav;
