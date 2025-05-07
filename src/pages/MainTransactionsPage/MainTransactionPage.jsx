import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";

const MainTransactionPage = () => {
  return (
    <div>
      <h1>Expense Log</h1>
      <p>
        Capture and organize every penny spent with ease! A clear view of your
        financial habits at your fingertips.
      </p>
      <TransactionsTotalAmount />
      <TransactionsChart />
    </div>
  );
};

export default MainTransactionPage;
