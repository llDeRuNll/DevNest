import React from "react";

const WelcomePage = () => {
  return (
    <div className="Wrapper">
      <main className="main">
        <div className="image-section">
          <img
            src="/img/couole.jpg"
            alt="Happy couple using ExpenseTracker"
            className="main-img"
          />
          <div className="balance-card">
            <p className="balance-label">Your balance</p>
            <p className="balance-amount">$632.000</p>
            <p className="balance-change">+1.29%</p>
          </div>
        </div>

        <div className="text-section">
          <p className="subheading">EXPENSE LOG</p>
          <h2 className="heading">
            Manage Your<span className="span-heading"> Finances</span>
            Masterfully!
          </h2>
          <p className="description">
            ExpenseTracker effortlessly empowers you to take control of your
            finances! With intuitive features, it simplifies the process of
            tracking and managing expenses, allowing for a stress-free mastery
            over your financial world.
          </p>
          <div className="buttons">
            <button className="btn-green">Sing Up</button>
            <button className="btn-outline">Sing In</button>
          </div>
          <div className="user-info">
            <img src="/img/users.png" alt="Users" className="users-img" />
            <div>
              <p className="users-count">1000 users +</p>
              <p className="users-note">
                Trusted by users for reliable expense tracking!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
