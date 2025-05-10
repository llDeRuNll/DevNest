import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import s from "./MainTransactionsPage.module.css";

const MainTransactionPage = () => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <div className={s.headerSection}>
          <p className={s.header}>Expense Log</p>
          <h1 className={s.text}>
            Capture and organize every penny spent with ease! A clear view of
            your financial habits at your fingertips.
          </h1>
        </div>

        <div className={s.totalsSection}>
          <TransactionsTotalAmount />
        </div>

        <div className={s.chartSection}>
          <TransactionsChart />
        </div>

        <div className={s.formSection}>
          <TransactionForm transaction={null} isModal={false} />
        </div>
      </div>
    </div>
  );
};

export default MainTransactionPage;
