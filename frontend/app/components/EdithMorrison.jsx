"use client";
import React from "react";

export default function EdithMorrison() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Name: Edith Morrison</h2>
      <p className="text-gray-700">Age: 86</p>
      <h3 className="mt-4 font-semibold text-gray-800">Medical Issues:</h3>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Alzheimers Disease (moderate stage)</li>
        <li>Osteoarthritis</li>
        <li>Hypertension</li>
      </ul>
      <h3 className="mt-4 font-semibold text-gray-800">Medications:</h3>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Donepezil (for Alzheimers)</li>
        <li>Acetaminophen (for pain relief from arthritis)</li>
        <li>Amlodipine (for hypertension)</li>
      </ul>
      <h3 className="mt-4 font-semibold text-gray-800">Allergies:</h3>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Penicillin</li>
      </ul>
    </div>
  );
}
