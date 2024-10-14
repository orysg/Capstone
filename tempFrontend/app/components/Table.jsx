"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Input,
  Chip,
  Tab,
  TabsHeader,
  Tabs,
} from "@material-tailwind/react";

import {
  PencilIcon,
  UserPlusIcon,
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
const TABLE_HEAD = [
  { head: "Fall ID" },
  { head: "Radar ID" },
  { head: "Fall Type" },
  { head: "Time" },
  { head: "Response Status" },
  { head: "Actions", customeStyle: "text-right" },
];
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Acknowledged",
    value: "acknowledged",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Resolved",
    value: "resolved",
  },
]
function Table() {

  const [fallHistory] = useState([
    {
      FallID: 1,
      RadarID: 101,
      FallType: "Slow",
      Timestamp: "2024-09-15T10:00:00",
      ResponseStatus: "Acknowledged",
    },
    {
      FallID: 2,
      RadarID: 102,
      FallType: "Fast",
      Timestamp: "2024-09-16T10:00:00",
      ResponseStatus: "Not Responded",
    },
    {
      FallID: 3,
      RadarID: 103,
      FallType: "False",
      Timestamp: "2024-09-17T10:00:00",
      ResponseStatus: "Acknowledged",
    },
  ]);

  const TABLE_ROW = fallHistory.map((fall) => ({
    fallID: fall.FallID,
    RadarID: fall.RadarID,
    type: fall.FallType,
    Date: new Date(fall.Timestamp).toISOString().split('T')[0],
    Status: fall.ResponseStatus,
    color: fall.type === "Fast" ? "red" : "green",
  }));

  return (
    <section className="m-10">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4">
          <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Fall list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about recent falls
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        </CardHeader>
        <CardBody className="overflow-scroll !px-0 py-2">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head }) => (
                  <th
                    key={head}
                    className={`border-b border-gray-300 !p-4 pb-8 `}
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
                ({ fallID, RadarID, type, Date, Status }, index) => {
                  const isLast = index === TABLE_ROW.length - 1;
                  const classes = isLast ? "!p-4" : "!p-4 border-b border-gray-300";
                  
                    return (
                    <tr key={fallID}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-center"
                        >
                          {fallID}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-center"
                        >
                          {RadarID}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex justify-center items-center">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={type}
                            color={type === "False" ? "green" : type === "Slow" ? "amber": "red"}/>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-center"
                        >
                          {Date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-bold text-center"
                        >
                          {Status}
                        </Typography>
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
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </section>
  );
}

export default Table;