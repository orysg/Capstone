"use client";
import dynamic from "next/dynamic";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import useRadarCount from '../hooks/useRadarCount';


// Import ApexCharts dynamically
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Chart configuration
const chartsConfig = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  grid: {
    show: true,
    borderColor: "#EEEEEE",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: false,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "light",
  },
};

// DeviceChart configuration
const DeviceChart = {
  type: "area",
  height: 220,
  series: [
    {
      name: "Active Devices",
      data: [2, 3, 5, 1, 3, 2, 4, 1, 2],
    },
  ],
  options: {
    ...chartsConfig,
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
      width: 2,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  },
};



// TotalDevicesChart component
const TotalDevicesChart = () => {
  const { totalRadars, loading, error } = useRadarCount();
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) { 
    return <div>Error: {error}</div>;
  } 
  const ChartsCardData = [
    {
      title: "Total Devices",
      price: totalRadars || 0,
      ActiveDevices: "Active Devices",
      volume: "24h Volume",
      ActiveNumber: "0",
      VolumeNumber: "0",
      chart: DeviceChart,
    },
  ];
  
  return (
    <Card className="shadow-md border border-gray-200 w-full h-fit">
      {ChartsCardData.map((data, index) => (
        <div key={index} className="mb-4">
          <CardHeader
            shadow={false}
            floated={false}
            className="flex items-start justify-between rounded-none overflow-visible"
          >
            <div>
              <Typography
                variant="small"
                className="text-gray-600 font-medium mb-1"
              >
                {data.title}
              </Typography>
              <Typography variant="h3" color="blue-gray">
                {data.price}{" "}
                <span className="text-gray-500">{data.price[1]}</span>
              </Typography>
            </div>
          </CardHeader>
          <Chart {...data.chart} />
          <CardBody className="pt-4 flex flex-wrap gap-y-4 justify-between">
            <div>
              <Typography
                variant="small"
                className="text-gray-600 font-medium mb-1"
              >
                {data.ActiveDevices}
              </Typography>
              <Typography variant="h3" color="blue-gray">
                {data.ActiveNumber}
              </Typography>
            </div>
            <div>
              <Typography
                variant="small"
                className="text-gray-600 font-medium mb-1"
              >
                {data.volume}
              </Typography>
              <Typography variant="h3" color="blue-gray">
                {data.VolumeNumber}
              </Typography>
            </div>
          </CardBody>
        </div>
      ))}
    </Card>
  );
};

export default TotalDevicesChart;
