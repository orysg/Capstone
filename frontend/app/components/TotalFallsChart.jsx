import dynamic from "next/dynamic";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

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

const fallChart = {
  type: "area",
  height: 220,
  series: [
    {
      name: "2024 Falls",
      data: [40, 40, 80, 100, 105, 110, 120, 140, 180],
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
    colors: ["#2196F3"],
    stroke: {
      lineCap: "round",
      width: 2,
    },
    fill: {
      opacity: 0,
      type: "outline",
    },
  },
};

const TotalFallsChart = () => {
  return (
    <Card className="shadow-md border border-gray-200 w-full h-fit">
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
            Total Falls
          </Typography>
          <Typography variant="h3" color="blue-gray">
            180
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
            <MenuItem>last Week</MenuItem>
            <MenuItem>last Year</MenuItem>
            <MenuItem>All Falls</MenuItem>
          </MenuList>
        </Menu>
      </CardHeader>
      <Chart {...fallChart} />
      <CardBody className="pt-4 flex flex-wrap gap-y-4 justify-between">
        <div>
          <Typography
            variant="small"
            className="text-gray-600 font-medium mb-1"
          >
            Users
          </Typography>
          <Typography variant="h3" color="blue-gray">
            18
          </Typography>
        </div>
        <div>
          <Typography
            variant="small"
            className="text-gray-600 font-medium mb-1"
          >
            Average UFR
          </Typography>
          <Typography variant="h3" color="blue-gray">
            8.35%
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default TotalFallsChart;
