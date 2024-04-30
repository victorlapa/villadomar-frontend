import { RevenueChart } from "..";

const BaseChartCard = () => {
  return (
    <div className="bg-white h-min text-center p-4 rounded-lg text-black">
      <h1>Receita (R$)</h1>
      <div className="flex justify-center gap-4">
        <div>
          <p>Total Geral</p>
          <p>154.000</p>
        </div>
        <div>
          <p>Mes atual</p>
          <p>19.550</p>
        </div>
        <div>
          <p>Hoje</p>
          <p>3000</p>
        </div>
      </div>
      <div>
        <RevenueChart />
      </div>
    </div>
  );
};

export default BaseChartCard;
