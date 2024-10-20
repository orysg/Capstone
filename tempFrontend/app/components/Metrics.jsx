import React from "react";
import DevicesCard from "./DevicesCard";
import TotalFallsChart from "./TotalFallsChart";
import TotalDevicesChart from "./TotalDevicesChart";

function MetricsCard() {
  return (
    <section className="py-10">
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-1 gap-5">
        <div className="col-span-1 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full">
            <TotalDevicesChart />
          </div>
          <div className="w-full">
            <TotalFallsChart />
          </div>
        </div>
        <div className="col-span-1 xl:col-span-1 w-full">
          <DevicesCard />
        </div>
      </div>
    </section>
  );
}
export default MetricsCard;
