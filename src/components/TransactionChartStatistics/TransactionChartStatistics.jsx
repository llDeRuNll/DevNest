import s from "./TransactionChartStatistics.module.css";
import { FaCircle } from "react-icons/fa";

const TransactionChartStatistics = () => {
  const data = [
    { id: 1, tType: "Hobby", amount: 45 },
    { id: 2, tType: "Products", amount: 25 },
    { id: 3, tType: "Cinema", amount: 20 },
    { id: 4, tType: "Health", amount: 10 },
    { id: 5, tType: "Sport", amount: 10 },
    { id: 6, tType: "Health", amount: 10 },
  ];

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const dataWithPercentage = data.map((item) => ({
    ...item,
    percentage: ((item.amount / total) * 100).toFixed(0),
  }));

  return (
    <ul className={s.statisticsList}>
      {dataWithPercentage.map((transaction) => (
        <li key={transaction.id} className={s.statisticsListItem}>
          <div className={s.iconTextWrapper}>
            <FaCircle className={s.iconOne} />
            <p>{transaction.tType}</p>
          </div>
          <span>{transaction.percentage}%</span>
        </li>
      ))}
    </ul>
  );
};

export default TransactionChartStatistics;
