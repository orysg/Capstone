
import React from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import merge from "deepmerge";
import useFalls from '../hooks/useFalls';


const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function AreaChart({ height = 350, series, colors, options }) {
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

export function ChartsExample5() {
  const { falls, loading, error } = useFalls();

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
    <section className="m-10">
      <Card>
        <CardBody className="!p-2">
          <div className="flex gap-2 flex-wrap justify-between px-4 !mt-4 ">
            <Typography variant="h3" color="blue-gray">
              Fall History
            </Typography>
          </div>
          {/* Chart */}
          <AreaChart
            colors={["#4CAF50"]}
            options={{
              xaxis: {
                categories: sortedDates, // Use sorted dates for the x-axis
              },
            }}
            series={seriesData}
          />
        </CardBody>
        <CardFooter className="flex gap-6 flex-wrap items-center justify-between">
          <div>
            <Typography variant="h6" color="blue-gray">
              Fall Report
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-gray-600 mt-1"
            >
              Total falls recorded over time
            </Typography>
          </div>
          <Button variant="outlined">View report</Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default ChartsExample5;