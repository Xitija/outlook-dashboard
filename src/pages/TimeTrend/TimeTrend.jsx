import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useParams } from "react-router-dom";
import { useData } from "../../context/AnalyticsDataContext";
import { graphDataGenerator } from "../../graph-utils";

export default function TimeTrend() {
  const { category } = useParams();
  const { data } = useData();

  const dataForCategory = graphDataGenerator(data, category);

  const timeSpentAndDate = Object.keys(dataForCategory).map((key) => ({
    date: key,
    time: dataForCategory[key],
  }));

  // data.map((item) => ({
  //   time: item[category],
  //   date: item.day,
  // }));

  return (
    <div className="flex grow-0 m-4 p-4" style={{ backgroundColor: "#ffffff" }}>
      <LineChart width={1000} height={500} data={timeSpentAndDate}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          label={{ value: "Date", position: "insideBottom", offset: -10 }}
          dataKey="date"
          padding={{ left: 30, right: 30 }}
        />
        <YAxis
          label={{
            value: "Time",
            angle: -90,
            position: "insideLeft",
            fill: "#333",
            fontSize: 18,
          }}
          domain={[0, "auto"]}
        />
        <Tooltip />
        <Legend />
        <Line
          dataKey="time"
          stroke="#220ddb"
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}
