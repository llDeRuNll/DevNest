import s from "./TotalAmountElement.module.css";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";

const TotalAmountElement = ({ currency, amount, type }) => {
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
          {currency}
          {(amount || 0).toFixed(3)}
        </span>
      </div>
    </div>
  );
};

export default TotalAmountElement;
