import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { FaCircle } from "react-icons/fa";
import s from "./TransactionsChart.module.css";

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

      <ul className={s.statisticsList}>
        <li className={s.statisticsListItem}>
          <div className={s.iconTextWrapper}>
            <FaCircle className={s.iconOne} />
            <p>Hobby</p>
          </div>
          <span>45%</span>
        </li>
        <li className={s.statisticsListItem}>
          <div className={s.iconTextWrapper}>
            <FaCircle className={s.iconTwo} />
            <p>Products</p>
          </div>
          <span>25%</span>
        </li>
        <li className={s.statisticsListItem}>
          <div className={s.iconTextWrapper}>
            <FaCircle className={s.iconThree} />
            <p>Cinema</p>
          </div>
          <span>20%</span>
        </li>
        <li className={s.statisticsListItem}>
          <div className={s.iconTextWrapper}>
            <FaCircle className={s.iconFour} />
            <p>Health</p>
          </div>
          <span>10%</span>
        </li>
      </ul>
    </div>
  );
};

export default TransactionsChart;
