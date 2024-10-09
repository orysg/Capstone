"use client";
import FallDocument from "../components/FallDocument";
import DefaultSidebar from "../components/Sidebar";
function Report() {
  return (
    <div>
      <DefaultSidebar />
      <div className="flex">
        <FallDocument />
      </div>
    </div>
  );
}
export default Report;
