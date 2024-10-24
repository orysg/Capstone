"use client";
import React from "react";
import RadarTable from "../../components/RadarTable";

export default function RadarKitManagement() {
  return (
    <div className="radar-kit-management-page p-8">
      <h1 className="text-3xl font-bold mb-8">Radar Kit Management</h1>
      <RadarTable />
    </div>
  );
}