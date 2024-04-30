import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { RevenueMock } from "@/mocks/revenue";

const RevenueChart = () => {
  return (
    <LineChart
      width={300}
      height={200}
      data={RevenueMock}
      title="Receita Mensal"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="x" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="y" stroke="#82ca9d" dot={false} />
    </LineChart>
  );
};

export default RevenueChart;
