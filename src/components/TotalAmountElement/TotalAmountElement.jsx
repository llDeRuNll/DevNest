import React from "react";
import { useSelector } from "react-redux";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import s from "./TotalAmountElement.module.css";

const currencySymbols = {
  uah: "₴",
  usd: "$",
  eur: "€",
};

const TotalAmountElement = ({ amount, type }) => {
  const userCurrencyCode =
    useSelector((state) => state.auth.user.currency)?.toLowerCase() || "uah";
  const symbol =
    currencySymbols[userCurrencyCode] || userCurrencyCode.toUpperCase();

  return (
    <div className={s.totalContainer}>
      <div className={s.totalIconWrapper}>
        {type === "Income" ? (
          <GoArrowUpRight className={s.totalIcon} />
        ) : (
          <GoArrowDownLeft className={s.totalIcon} />
        )}
      </div>
      <div className={s.totalDescription}>
        <p className={s.totalText}>Total {type}</p>
        <span className={s.currencySpan}>
          {symbol}
          {(amount || 0).toFixed(3)}
        </span>
      </div>
    </div>
  );
};

export default TotalAmountElement;
