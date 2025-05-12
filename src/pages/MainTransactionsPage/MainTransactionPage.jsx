import React from "react";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import { SiDatadog } from "react-icons/si";
import s from "./MainTransactionsPage.module.css";
import { selectTransactionsExpenses } from "../../redux/transactions/selectors";
import { useSelector } from "react-redux";
import { dataWithPercentage } from "../../utils/expensesOperations";

const MainTransactionPage = () => {
  const expencesFromServer = useSelector(selectTransactionsExpenses);
  const expences = dataWithPercentage(expencesFromServer);

  return (
    <div className="container">
      <div className={s.wrapper}>
        <div className={s.headerSection}>
          <h1 className={s.header}>Expense Log</h1>
          <p className={s.text}>
            Capture and organize every penny spent with ease! A clear view of
            your financial habits at your fingertips.
          </p>
        </div>

        <div className={s.totalsSection}>
          <TransactionsTotalAmount />
        </div>

        <div className={s.chartSection}>
          {expences.length > 0 ? (
            <TransactionsChart expences={expences} />
          ) : (
            <div className={s.piePlaceholderContainer}>
              <p className={s.piePlaceholderText}>
                Add your first expense to see a beautiful chart of your
                spending!
              </p>
              <SiDatadog className={s.piePlaceholderIcon} />
            </div>
          )}
        </div>

        <div className={s.formSection}>
          <TransactionForm transaction={null} isModal={false} />
        </div>
      </div>
    </div>
  );
};

export default MainTransactionPage;
