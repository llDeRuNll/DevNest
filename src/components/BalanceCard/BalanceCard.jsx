
import s from "./BalanceCard.module.css";
import { HiMiniArrowUpRight } from "react-icons/hi2";

const BalanceCard = () => {
  return (
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
  );
};

export default BalanceCard;
