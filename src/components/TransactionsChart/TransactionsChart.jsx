import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import s from "./TransactionsChart.module.css";
import TransactionChartStatistics from "../TransactionChartStatistics/TransactionChartStatistics";

const data = [
  { name: "Group A", value: 500 },
  { name: "Group B", value: 400 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0ebb69", "#0ef387", "#fafafa", "#FAFAFA33"];

const TransactionsChart = () => {
  return (
    <div className={s.expensesWrapper}>
      <div className={s.test}>
        <h3 className={s.expensesTitle}>Expenses categories</h3>
        <div className={s.chartContainer}>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart height={20}>
              <Pie
                data={data}
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
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-2-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={s.percentage}>100%</div>
      </div>
      <TransactionChartStatistics />
    </div>
  );
};

export default TransactionsChart;
