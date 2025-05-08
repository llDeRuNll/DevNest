import React from "react";
import { Link } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={s.authNav}>
      <Link to="/register" className={s.btnGreen}>
        Sign Up
      </Link>
      <Link to="/login" className={s.btnOutline}>
        Sign In
      </Link>
    </div>
  );
};

export default AuthNav;
