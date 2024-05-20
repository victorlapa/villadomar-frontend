import { BaseChartCard, Page, Sidebar } from "@/components";
export default function Financeiro() {
  return (
    <Page>
      <Sidebar />
      <div className="flex justify-center space-x-20 w-full h-1/4 pt-10">
        <div className="box border-2 border-black rounded-md w-1/6 h-1/2">
          <div className="content-center text-center w-full h-full">
            <div className="font-bold text-2xl">Status</div>
            <div className="font-bold text-base">Aberto</div>
          </div>
        </div>
        <div className="box border-2 border-black rounded-md w-1/6 h-1/2">
          <div className="content-center text-center w-full h-full">
            <div className="font-bold text-2xl">Entrada</div>
            <div className="font-bold text-base text-green-600">R$0,00</div>
          </div>
        </div>
        <div className="box border-2 border-black rounded-md w-1/6 h-1/2">
          <div className="content-center text-center w-full h-full">
            <div className="font-bold text-2xl">Saida</div>
            <div className="font-bold text-base text-red-600">R$0,00</div>
          </div>
        </div>
      </div>
    </Page>
  );
}
