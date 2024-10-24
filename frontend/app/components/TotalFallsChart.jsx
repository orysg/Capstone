import dynamic from "next/dynamic";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import merge from "deepmerge";
import useFalls from '../hooks/useFalls';
import useFallsCount from '../hooks/useFallsCount';

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function AreaChart({ height = 220, series, colors, options }) {
  const chartOptions = React.useMemo(
    () => ({
      colors,
      ...merge(
        {
          chart: {
            height: height,
            type: "area",
            zoom: {
              enabled: false,
            },
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
          legend: {
            show: false,
          },
          markers: {
            size: 0,
            strokeWidth: 0,
            strokeColors: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          grid: {
            show: true,
            borderColor: "#EEEEEE",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          tooltip: {
            theme: "light",
          },
          yaxis: {
            labels: {
              style: {
                colors: "#757575",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#757575",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0,
              opacityTo: 0,
              stops: [0, 100],
            },
          },
        },
        options ? options : {}
      ),
    }),
    [height, colors, options]
  );

  return (
    <Chart type="area" height={height} series={series} options={chartOptions} />
  );
}

const TotalFallsChart = () => {
  const { falls, loading, error } = useFalls();
  const { totalFalls } = useFallsCount();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Prepare data for the chart
  const fallCounts = {};

  // Group falls by date (or hour, depending on your requirement)
  falls.forEach(fall => {
    const date = new Date(fall.timestamp).toLocaleDateString(); // Format the date as needed
    if (!fallCounts[date]) {
      fallCounts[date] = 0;
    }
    fallCounts[date] += 1; // Count falls for each date
  });

  // Convert the counts object into a sorted array for the chart
  const sortedDates = Object.keys(fallCounts).sort((a, b) => new Date(a) - new Date(b));
  const seriesData = [
    {
      name: "Falls Over Time",
      data: sortedDates.map(date => fallCounts[date]), // Get counts for each date
    },
  ];
  
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
          {totalFalls}
          </Typography>
        </div>
      </CardHeader>
      <AreaChart
            colors={["#4CAF50"]}
            options={{
              xaxis: {
                categories: sortedDates, // Use sorted dates for the x-axis
              },
            }}
            series={seriesData}
          />
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
