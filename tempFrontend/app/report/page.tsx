"use client";
import FallDocument from "../components/FallDocument";
import FallList from "../components/FallList";
function Report() {
  return (
    <div>
      <div className="flex">
        <FallDocument />
        <FallList />
      </div>
    </div>
  );
}
export default Report;
