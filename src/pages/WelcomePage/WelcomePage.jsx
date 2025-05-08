import React from "react";
import s from "./WelcomePage.module.css";
import AuthNav from "../../components/AuthNav/AuthNav";
import AllUsersTab from "../../components/AllUsersTab/AllUsersTab";

const WelcomePage = () => {
  return (
    <div className={s.container}>
      <main className={s.main}>
        <div className={s.textSection}>
          <div className={s.listInfo}>
            <p className={s.subheading}>EXPENSE LOG</p>
            <h2 className={s.heading}>
              Manage {""}
              <span className={s.noBreak}>
                Your <span className={s.spanHeading}>Finances</span>
              </span>
              <br />
              Masterfully!
            </h2>
            <p className={s.description}>
              ExpenseTracker effortlessly empowers you to take control of your
              finances! With intuitive features, it simplifies the process of
              tracking and managing expenses, allowing for a stress-free mastery
              over your financial world.
            </p>
            <AuthNav />
          </div>
          <AllUsersTab />
        </div>

        <div className={s.imageSection}>
          <img
            src="/imgWelcomePage/Rec2x.png"
            alt="Happy couple using ExpenseTracker"
            className={s.mainImg}
          />
          <div className={s.balanceCard}>
            <p className={s.balanceLabel}>Your balance</p>
            <p className={s.balanceAmount}>$632.000</p>
            <p className={s.balanceChange}>+1.29%</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
