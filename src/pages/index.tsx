import { BaseChartCard, Page, Sidebar } from "@/components";
import { getAuthCookie } from "@/utils/cookies";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (!getAuthCookie()) {
      window.location.href = "/login";
    }
  });

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
