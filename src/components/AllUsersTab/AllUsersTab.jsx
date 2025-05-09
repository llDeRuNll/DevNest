import React from "react";
import s from "./AllUsersTab.module.css";

const AllUsersTab = () => {
  return (
    <div className={s.alUsersTab}>
      <div className={s.userAvatar}>
        <img
          src="/imgWelcomePage/user.jpg"
          alt="User1"
          className={s.usersImg}
        />
        <img
          src="/imgWelcomePage/user2.jpg"
          alt="User2"
          className={s.usersImg}
        />
        <img
          src="/imgWelcomePage/user3.jpg"
          alt="User3"
          className={s.usersImg}
        />
      </div>
      <div className={s.countText}>
        <p className={s.usersCount}>1000 users +</p>
        <p className={s.usersNote}>
          Trusted by users for reliable expense tracking!
        </p>
      </div>
    </div>
  );
};

export default AllUsersTab;
