import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import s from "./TransactionsChart.module.css";
import TransactionChartStatistics from "../TransactionChartStatistics/TransactionChartStatistics";

const COLORS = [
  "#0ebb69",
  "#0ef387",
  "#c3ede0",
  "#29292b",
  "#0cae60",
  "#1f7a5a",
  "#278559",
  "#2f6e58",
  "#9ab4a8",
  "#3a6b54",
  "#b2d8cb",
  "#286a4b",
  "#4ab28f",
  "#6deab0",
  "#b9f0e0",
  "#88cbb5",
  "#5dbb9b",
  "#1c9e7d",
  "#89d3b2",
  "#74e3c1",
];

const TransactionsChart = ({ expences }) => {
  const categoryColorMap = {};
  let colorIndex = 0;

  expences.forEach((item) => {
    const category = item.category.categoryName;
    if (!categoryColorMap[category]) {
      categoryColorMap[category] = COLORS[colorIndex % COLORS.length];
      colorIndex++;
    }
  });

  const pieChartData = Object.entries(
    expences.reduce((acc, item) => {
      const category = item.category.categoryName;
      acc[category] = (acc[category] || 0) + item.sum;
      return acc;
    }, {})
  )
    .map(([name, value]) => ({ name, value, fill: categoryColorMap[name] }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className={s.expensesWrapper}>
      <div className={s.test}>
        <h3 className={s.expensesTitle}>Expenses categories</h3>
        <div className={s.chartContainer}>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={90}
                outerRadius={130}
                cornerRadius={10}
                paddingAngle={-10}
                dataKey="value"
                stroke="none"
                className={s.pie}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={s.percentage}>100%</div>
      </div>

      <TransactionChartStatistics
        data={pieChartData}
        colorMap={categoryColorMap}
      />
    </div>
  );
};

export default TransactionsChart;
