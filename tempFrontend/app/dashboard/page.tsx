"use client";
import FallAlert from "../components/FallAlert";
import Table from "../components/Table";
import MetricsCard1 from "../components/Metrics";
function Dashboard() {
  return (
    <>
      <div className="w-full max-w-8xl mx-auto">
        <FallAlert />
        <MetricsCard1 />
        <Table />
      </div>
    </>
  );
}
export default Dashboard;
