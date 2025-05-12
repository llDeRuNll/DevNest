import s from "./TransactionChartStatistics.module.css";
import { FaCircle } from "react-icons/fa";

const TransactionChartStatistics = ({ data, colorMap }) => {
  return (
    <ul className={s.statisticsList}>
      {data.map((transaction) => (
        <li key={transaction.category._id} className={s.statisticsListItem}>
          <div className={s.iconTextWrapper}>
            <FaCircle
              style={{ color: colorMap[transaction.category.categoryName] }}
            />
            <p>{transaction.category.categoryName}</p>
          </div>
          <span>{transaction.percentage}%</span>
        </li>
      ))}
    </ul>
  );
};

export default TransactionChartStatistics;
