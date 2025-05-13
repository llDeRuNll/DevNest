import React from "react";
import s from "./TransactionChartStatistics.module.css";
import { FaCircle } from "react-icons/fa";

const truncate = (str, maxChars = 10) =>
  str.length > maxChars ? `${str.slice(0, maxChars)}...` : str;

const TransactionChartStatistics = ({ data = [], colorMap }) => {
  if (data.length === 0) {
    return <p className={s.empty}>Немає витрат для відображення</p>;
  }

  // Сортуємо дані за спаданням значення
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const total = sortedData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <ul className={s.statisticsList}>
      {sortedData.map((entry) => {
        const percent = ((entry.value / total) * 100).toFixed(0);
        return (
          <li key={entry.name} className={s.statisticsListItem}>
            <div className={s.iconTextWrapper}>
              <FaCircle style={{ color: colorMap[entry.name] }} />
              <p title={entry.name}>{truncate(entry.name)}</p>
            </div>
            <span>{percent}%</span>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionChartStatistics;
