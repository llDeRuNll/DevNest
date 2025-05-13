import React from "react";
import s from "./TransactionChartStatistics.module.css";
import { FaCircle } from "react-icons/fa";

const truncate = (str, maxChars = 10) =>
  str.length > maxChars ? `${str.slice(0, maxChars)}...` : str;

const TransactionChartStatistics = ({ expences, colorMap }) => {
  return (
    <ul className={s.statisticsList}>
      {expences.map((transaction) => {
        const name = transaction.category.categoryName;
        return (
          <li key={transaction.category._id} className={s.statisticsListItem}>
            <div className={s.iconTextWrapper}>
              <FaCircle style={{ color: colorMap[name] }} />

              <p title={name}>{truncate(name)}</p>
            </div>
            <span>{transaction.percentage}%</span>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionChartStatistics;
