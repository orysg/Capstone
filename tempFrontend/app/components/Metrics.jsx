'use client';
import React from "react";
import {
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function MetricsCard({
  title,
  devices,
}) {
  return (
    <Card className="shadow-sm border border-gray-200 !rounded-lg">
      <CardBody className="p-4">
        <div className="flex justify-between items-center">
          <Typography
            className="!font-medium !text-xs text-gray-600"
          >
            {title}
          </Typography>
        </div>
        <Typography
          color="blue-gray"
          className="mt-1 font-bold text-2xl"
        >
          {devices}
        </Typography>
      </CardBody>
    </Card>
  );
}

const data = [
  {
    title: "Total Devices",
    devices: "50",
  },
  {
    title: "Active Devices",
    devices: "10",
  },
  {
    title: "Devices detecting Movement",
    devices: "7",
  },
  {
    title: "Fall Count",
    devices: "200",
  },
];

function MetricsCard1() {
  return (
    <section className="container mx-auto max-w-screen-xl py-20 px-8">
      <div className="flex justify-between md:items-center">
        <div>
          <Typography className="font-bold">Current Status</Typography>
          <Typography
            variant="small"
            className="font-normal text-gray-600 md:w-full w-4/5"
          >
            Current Device status and fall history
          </Typography>
        </div>
        <div className="shrink-0">
          <Menu>
            <MenuHandler>
              <Button
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
        </div>
      </div>
      <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 items-center md:gap-2.5 gap-4 ">
        {data.map((props, key) => (
          <MetricsCard key={key} {...(props)} />
        ))}
      </div>
    </section>
  );
}

export default MetricsCard1;