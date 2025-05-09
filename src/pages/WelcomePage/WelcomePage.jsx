import React from "react";
import s from "./WelcomePage.module.css";
import AuthNav from "../../components/AuthNav/AuthNav";
import AllUsersTab from "../../components/AllUsersTab/AllUsersTab";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import useIsDesktop from "../../hooks/useIsDesktop";

const WelcomePage = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className="container">
      <main className={s.main}>
        <div className={s.textSection}>
          <div className={s.listInfo}>
            <p className={s.subheading}>EXPENSE LOG</p>

            <h2 className={s.heading}>
              Manage Your{" "}
              <span className={s.breakMobile}>
                <span className={s.spanHeading}>Finances</span>
                <br />
                Masterfully!
              </span>
              <span className={s.breakTabletDesktop}>
                <br />
                <span className={s.spanHeading}>Finances</span> Masterfully!
              </span>
            </h2>

            <p className={s.description}>
              ExpenseTracker effortlessly empowers you to take control of your
              finances! With intuitive features, it simplifies the process of
              tracking and managing expenses, allowing for a stress-free mastery
              over your financial world.
            </p>

            <AuthNav />
          </div>

          {isDesktop && <AllUsersTab />}
        </div>

        <div className={s.imageSection}>
          <div className={s.mainImg}></div>
          <div className={s.balanceCard}>
            <div className={s.iconCircle}>
              <HiMiniArrowUpRight className={s.arrowIcon} />
            </div>
            <div className={s.balance}>
              <p className={s.balanceLabel}>Your balance</p>
              <p className={s.balanceAmount}>$632.000</p>
            </div>
            <p className={s.balanceChange}>+1.29%</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
