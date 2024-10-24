"use client";
import React from "react";

export default function MarthaReyes() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Name: Martha Reyes</h2>
      <p className="text-gray-700">Age: 90</p>
      <h3 className="mt-4 font-semibold text-gray-800">Medical Issues:</h3>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Stroke recovery (partial paralysis on right side)</li>
        <li>Atrial Fibrillation</li>
        <li>Cataracts</li>
      </ul>
      <h3 className="mt-4 font-semibold text-gray-800">Medications:</h3>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Warfarin (for Atrial Fibrillation)</li>
        <li>Eye drops (for cataracts)</li>
        <li>Physical therapy treatments</li>
      </ul>
      <h3 className="mt-4 font-semibold text-gray-800">Allergies:</h3>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Aspirin</li>
      </ul>
    </div>
  );
}
