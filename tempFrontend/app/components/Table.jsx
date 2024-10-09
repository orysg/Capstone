'use client';
import React from "react";
import dynamic from "next/dynamic";

// charts import
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// @material-tailwind/react
import {
    Avatar,
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Input,
} from "@material-tailwind/react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

// deepmerge
import merge from "deepmerge";

// area chart

function AreaChart({ height = 90, series, colors, options }) {
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
            show: false,
            xaxis: {
              lines: {
                show: false,
              },
            },
            padding: {
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            },
          },
          tooltip: {
            theme: "light",
          },
          yaxis: {
            labels: {
              show: false,
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
              show: false,
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.4,
              opacityTo: 0.6,
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

const TABLE_ROW = [
    {
        userImg: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        UserName: "John Doe",
        Date: "1/1/2024",
        Severity: "1",
        TotalUserFalls: "12",
        color: "green",
        trend: 4,
    },
    {
        userImg: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        UserName: "John Doe",
        Date: "1/1/2024",
        Severity: "2",
        TotalUserFalls: "12",
        color: "orange",
        trend: 4,
    },
    {
        userImg: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        UserName: "John Doe",
        Date: "1/1/2024",
        Severity: "3",
        TotalUserFalls: "12",
        color: "deep-orange",
        trend: 4,
    },
    {
        userImg: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        UserName: "John Doe",
        Date: "1/1/2024",
        Severity: "4",
        TotalUserFalls: "12",
        color: "red",
        trend: 4,
    },
];

const TABLE_HEAD = [
  {
    head: "User",
    customeStyle: "!text-left",
  },
  {
    head: "Date",
    customeStyle: "text-right",
  },
  {
    head: "Severity",
    customeStyle: "text-right",
  },
  {
    head: "Total User Falls",
    customeStyle: "text-right",
  },

  {
    head: "Trend",
    customeStyle: "text-right",
  },
  {
    head: "Actions",
    customeStyle: "text-right",
  },
];

function Table() {
  return (

        <section className="m-10">
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
        >
          <div>
            <Typography variant="h6" color="blue-gray">
              Recent Falls
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 font-normal mt-1"
            >
              The most recent falls and  their severity
            </Typography>
          </div>
          <div className="flex items-center w-full shrink-0 gap-4 md:w-max">
            <div className="w-full md:w-72">
              <Input
                size="lg"
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button
              variant="outlined"
              className="flex items-center gap-2"
            >
              24h
              <ChevronDownIcon strokeWidth={3} className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll !px-0 py-2">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head, customeStyle }) => (
                  <th
                    key={head}
                    className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle}`}
                  >
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROW.map(
                (
                  {
                    userImg: user,
                    UserName,
                    Date,
                    Severity,
                    TotalUserFalls,
                    color,
                  },
                  index
                ) => {
                  const isLast = index === TABLE_ROW.length - 1;
                  const classes = isLast
                    ? "!p-4"
                    : "!p-4 border-b border-gray-300";
                  return (
                    <tr key={UserName}>
                      <td className={classes}>
                        <div className="flex items-center gap-4 text-left">
                            <Avatar
                            src={user}
                            alt={UserName}
                            size="sm" // size can be set to "sm", "md", "lg", or "xl"
                            className="border rounded-md"
                            />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="!font-semibold"
                            >
                              {UserName}
                            </Typography>
                            
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-right"
                        >
                          {Date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color={color}
                          className="!font-bold text-right"
                        >
                          {Severity}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-right"
                        >
                          {TotalUserFalls}
                        </Typography>
                      </td>
                      
                      <td className={classes}>
                        <div className="max-w-[12rem] ml-auto h-12 -translate-y-6">
                          <AreaChart
                            colors={["#2196F373"]}
                            options={{}}
                            series={[
                              {
                                name: "2023 Falls",
                                data: [
                                  1, 3, 0, 1, 2, 3, 0, 1, 2,
                                ],
                              },
                            ]}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex justify-end gap-4">
                          <IconButton variant="text" size="sm">
                            <DocumentMagnifyingGlassIcon className="h-5 w-5 text-gray-900" />
                          </IconButton>
                          <IconButton variant="text" size="sm">
                            <FlagIcon className="h-5 w-5 text-gray-900" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </section>
    
  );
}

export default Table;