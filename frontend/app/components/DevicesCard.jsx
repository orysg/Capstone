import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";

function DevicesCard({ name, devices }) {
  return (
    <Card className="shadow-md border border-gray-200">
      <CardBody className="p-4">
        <Typography variant="small" className="text-gray-600 font-medium mb-1">
          {name}
        </Typography>
        <Typography variant="h3" color="blue-gray">
          {devices}{" "}
        </Typography>
      </CardBody>
    </Card>
  );
}

const DeviceCardData = [
  {
    name: "Active Devices",
    devices: "16",
  },
  {
    name: "Devices Detecting Movement",
    devices: "10",
  },
  {
    name: "Total Devices",
    devices: "47",
  },
];

function DeviceCards() {
  return (
    <div className="flex flex-col gap-4">
      {DeviceCardData.map((device, index) => (
        <DevicesCard key={index} name={device.name} devices={device.devices} />
      ))}
    </div>
  );
}
export default DeviceCards;
