"use client";
import dynamic from "next/dynamic";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
      data: [10, 15, 20, 25, 30, 35, 40, 50, 60],
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

const ChartsCardData = [
  {
    title: "Total Devices",
    price: ["32"],
    ActiveDevices: "Active Devices",
    volume: "24h Volume",
    ActiveNumber: "18",
    VolumeNumber: "24",
    chart: DeviceChart,
  },
];

// TotalDevicesChart component
const TotalDevicesChart = () => {
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
                {data.price[0]}{" "}
                <span className="text-gray-500">{data.price[1]}</span>
              </Typography>
            </div>
            <Menu>
              <MenuHandler>
                <Button
                  size="sm"
                  color="gray"
                  variant="outlined"
                  className="flex items-center gap-1 !border-gray-300"
                >
                  last 24h
                  <ChevronDownIcon
                    strokeWidth={4}
                    className="w-3 h-3 text-gray-900"
                  />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem>last 12h</MenuItem>
                <MenuItem>last 10h</MenuItem>
                <MenuItem>last 24h</MenuItem>
              </MenuList>
            </Menu>
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
