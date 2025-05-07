import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";
import s from "./TransactionsTotalAmount.module.css";
import { useState } from "react";
const TransactionsTotalAmount = () => {
  const [totalIncome, setTotalIncome] = useState(632.101);
  const [totalExpense, setTotalExpense] = useState(632.101);
  const [currency, setCurrency] = useState("$");

  return (
    <div className={s.mainWrapper}>
      <div className={s.totalContainer}>
        <div className={s.totalIconWrapper}>
          <GoArrowUpRight className={s.totalIcon} />
        </div>
        <div className={s.totalDescription}>
          <p className={s.totalText}>Total income</p>
          <span className={s.currencySpan}>
            {currency}
            {totalIncome}
          </span>
        </div>
      </div>
      <div className={s.totalContainer}>
        <div className={s.totalIconWrapper}>
          <GoArrowDownLeft className={s.totalIcon} />
        </div>
        <div className={s.totalDescription}>
          <p className={s.totalText}>Total Expense</p>
          <span className={s.currencySpan}>
            {currency}
            {totalExpense}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTotalAmount;
