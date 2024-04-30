import { BaseChartCard, Page, Sidebar } from "@/components";

export default function Home() {
  return (
    <Page>
      <Sidebar />
      <div className="flex justify-center gap-12 mx-auto p-10">
        <BaseChartCard />
        <BaseChartCard />
        <BaseChartCard />
      </div>
    </Page>
  );
}
