"use client";

import DefaultSidebar from "../components/Sidebar";
import FallAlert from "../components/FallAlert";
import Table from "../components/Table";
import MetricsCard1 from "../components/Metrics";
function Dashboard() {
  return (
    <>
      <DefaultSidebar />
      <div className="w-full max-w-8xl mx-auto">
        <FallAlert />
        <MetricsCard1 />
        <Table />
      </div>
    </>
  );
}
export default Dashboard;
