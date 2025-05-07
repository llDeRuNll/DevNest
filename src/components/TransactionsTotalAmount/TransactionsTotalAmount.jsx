import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";
import s from "./TransactionsTotalAmount.module.css";

const TransactionsTotalAmount = () => {
  const totalIncome = 632.0;
  const totalExpense = 632.0;
  const currency = "$";

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
            {totalIncome.toFixed(3)}
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
            {totalExpense.toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTotalAmount;
