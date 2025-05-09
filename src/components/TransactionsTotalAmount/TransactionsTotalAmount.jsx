import s from "./TransactionsTotalAmount.module.css";
import TotalAmountElement from "../TotalAmountElement/TotalAmountElement";
import { useSelector } from "react-redux";
import { selectTransactionsTotal } from "../../redux/transactions/selectors";
import ToasterSuccess from "../ToasterSuccess/ToasterSuccess";

const TransactionsTotalAmount = () => {
  const { incomes, expenses } = useSelector(selectTransactionsTotal);

  const currency = "$";

  return (
    <div className={s.mainWrapper}>
      <button onClick={ToasterSuccess} type="button">
        Click
      </button>
      <TotalAmountElement
        currency={currency}
        amount={incomes}
        type={"Income"}
      />

      <TotalAmountElement
        currency={currency}
        amount={expenses}
        type={"Expense"}
      />
    </div>
  );
};

export default TransactionsTotalAmount;
