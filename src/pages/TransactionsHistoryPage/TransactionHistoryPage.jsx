import { useEffect, useState } from "react";
import TransactionsSearchTools from "../../components/TransactionsSearchTools/TransactionsSearchTools";
import s from "./TransactionsHistoryPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { transactionsGetByType } from "../../redux/transactions/operations";
import { useParams } from "react-router-dom";
import { selectIsLoading } from "../../redux/transactions/selectors";
import Loader from "../../components/Loader/Loader";
import TransactionsSummary from "../../components/TransactionsSummary/TransactionsSummary";
import TransactionsList from "../../components/TransactionsList/TransactionsList";

const TransactionHistoryPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hasUserPickedDate, setHasUserPickedDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const { transactionsType } = useParams();
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

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

  const transactions = useSelector(
    (state) => state.transactions[transactionsType]
  );
  return (
    <>
      {isLoading && <Loader />}
      <section className={s.section}>
        <div className="container">
          <TransactionsSummary transactionsType={transactionsType} />
          <div className={s.transactionWrapper}>
            <TransactionsSearchTools
              setSearchQuery={setSearchQuery}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              setHasUserPickedDate={setHasUserPickedDate}
              hasUserPickedDate={hasUserPickedDate}
            />
            <TransactionsList
              windowWidth={windowWidth}
              searchQuery={searchQuery}
              selectedDate={selectedDate}
              transactions={transactions}
              hasUserPickedDate={hasUserPickedDate}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TransactionHistoryPage;
