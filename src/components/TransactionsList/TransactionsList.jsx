import s from "./TransactionsList.module.css";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
// import { selectTransactions } from '../../redux/transactions/selectors'
import { useSelector } from "react-redux";
import transactions1 from "./transactions.json";

const TransactionsList = ({ windowWidth, userValue, startDate }) => {
  const transactions = useSelector(selectTransactions);
  const dataConversion = `${startDate.getFullYear()}-${
    startDate.getMonth() + 1
  }-${startDate.getDate()}`;
  const filteredTransactionsByUserValue = transactions.filter((transaction) =>
    transaction?.comment.toLowerCase().includes(userValue.toLowerCase())
  );
  const filteredTransactionsByData = transactions.filter(
    (transaction) => transaction?.date === dataConversion
  );

  return (
    <div className={s.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Time</th>
            <th>Sum</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactionsByUserValue?.map((transaction) => (
            <TransactionsItem
              key={transaction._id}
              data={transaction}
              windowWidth={windowWidth}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
