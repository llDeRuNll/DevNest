import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import s from "./MainTransactionsPage.module.css";

const MainTransactionPage = () => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <div>
          <p className={s.header}>Expense Log</p>
          <p className={s.text}>
            Capture and organize every penny spent with ease! A clear view of
            your financial habits at your fingertips.
          </p>
        </div>
        <TransactionsTotalAmount />
        <TransactionForm transaction={null} isModal={false} />
        <TransactionsChart />
      </div>
    </div>
  );
};

export default MainTransactionPage;
