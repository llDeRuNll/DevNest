import s from "./TransactionsTotalAmount.module.css";
import TotalAmountElement from "../TotalAmountElement/TotalAmountElement";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactionsTotal } from "../../redux/transactions/selectors";
import { useEffect } from "react";
import { transactionsGetByType } from "../../redux/transactions/operations";

const TransactionsTotalAmount = () => {
  const { incomes, expenses } = useSelector(selectTransactionsTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionsGetByType({ type: "expenses" }));
    dispatch(transactionsGetByType({ type: "incomes" }));
  }, [dispatch]);
  const currency = "$";

  return (
    <div className={s.mainWrapper}>
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
