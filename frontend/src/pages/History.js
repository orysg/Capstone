import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';


function History() {
  const data = [
    { month: 1, count: 10 },
    { month: 2, count: 10 },
    { month: 3, count: 20 },
    { month: 4, count: 15 },
    { month: 5, count: 25 },
    { month: 6, count: 22 },
    { month: 7, count: 30 },
    { month: 8, count: 28 },
    { month: 9, count: 5 },
    { month: 10, count: 4 },
    { month: 11, count: 15 },
    { month: 12, count: 10 },
];

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById('History');

    // Destroy existing chart if it exists
    if (chartRef.current) {
        chartRef.current.destroy();
    }

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(row => row.month),
        datasets: [
          {
            label: 'Falls by Month',
            data: data.map(row => row.count)
          }
        ]
      }
    });
    chartRef.current = myChart;
  }, [data]); // Empty dependency array ensures it runs only once after render



  return (
    <div>
      <h2>Fall History</h2>
      <canvas ref={canvasRef} id="History"></canvas>
    </div>
  );
}


export default History;