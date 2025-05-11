import { useEffect, useState } from "react";
import TransactionsSearchTools from "../../components/TransactionsSearchTools/TransactionsSearchTools";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import s from "./TransactionsHistoryPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { transactionsGetByType } from "../../redux/transactions/operations";
import { useParams } from "react-router-dom";
import { selectIsLoading } from "../../redux/transactions/selectors";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import Loader from "../../components/Loader/Loader";

const TransactionHistoryPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [startDate, setStartDate] = useState(null);
  const [userValue, setUserValue] = useState("");
  const { transactionsType } = useParams();
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state) => state.transactions[transactionsType]
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadDataByType = async () => {
      await dispatch(
        transactionsGetByType({ type: transactionsType })
      ).unwrap();
    };
    loadDataByType();
  }, [dispatch, transactionsType]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={s.section}>
        <div className="container">
          <div className={s.summaryWrapper}>
            <div className={s.textWrapper}>
              <h2 className={s.title}>
                {transactionsType === "expenses" ? "All Expense" : "All Income"}
              </h2>
              <p className={s.description}>
                {transactionsType === "expenses"
                  ? "View and manage every transaction seamlessly! Your entire financial landscape, all in one place."
                  : "Track and celebrate every bit of earnings effortlessly! Gain insights into your total revenue in a snap."}
              </p>
            </div>
            <TransactionsTotalAmount />
          </div>
          <div className={s.transactionWrapper}>
            <TransactionsSearchTools
              setUserValue={setUserValue}
              setStartDate={setStartDate}
              startDate={startDate}
            />
            <TransactionsList
              windowWidth={windowWidth}
              userValue={userValue}
              startDate={startDate}
              transactions={transactions}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TransactionHistoryPage;
