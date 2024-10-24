"use client";
import React from "react";

export default function HaroldFletcher() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Name: Harold Fletcher</h2>
      <p className="text-gray-700">Age: 79</p>
      <h3 className="mt-4 font-semibold text-gray-800">Medical Issues:</h3>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Chronic Obstructive Pulmonary Disease (COPD)</li>
        <li>Type 2 Diabetes</li>
        <li>Congestive Heart Failure</li>
      </ul>
      <h3 className="mt-4 font-semibold text-gray-800">Medications:</h3>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Metformin (for diabetes)</li>
        <li>Furosemide (for heart failure)</li>
        <li>Inhaler (Albuterol for COPD)</li>
      </ul>
      <h3 className="mt-4 font-semibold text-gray-800">Allergies:</h3>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Shellfish</li>
      </ul>
    </div>
  );
}
