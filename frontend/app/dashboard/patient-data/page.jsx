"use client";
import React from "react";
import EdithMorrison from "../../components/EdithMorrison";
import HaroldFletcher from "../../components/HaroldFletcher";
import MarthaReyes from "../../components/MarthaReyes";

export default function PatientData() {
  return (
    <div className="p-6 space-y-6">
      <EdithMorrison />
      <HaroldFletcher />
      <MarthaReyes />
    </div>
  );
}
