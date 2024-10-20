import React from "react";
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
//import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export function FallDocument() {
  const tempFall = {
    FallID: 1,
    RadarID: 101,
    FallType: "Slow",
    Timestamp: "2024-09-15T10:00:00",
    ResponseStatus: "Acknowledged",
  };
  const fallDate = new Date(tempFall.Timestamp).toLocaleDateString();
  const fallTime = new Date(tempFall.Timestamp).toLocaleTimeString();

  return (
    <section className="container mx-auto py-20 px-8">
      <div className="mt-8 grid lg:gap-x-6 gap-y-6 lg:grid-cols-12 grid-cols-6">
        <div className="col-span-8 space-y-6">
          <Card className="border border-gray-300 !rounded-md shadow-sm">
            <CardHeader>
              <Typography variant="h4">Fall Details</Typography>
              <Typography className="text-gray-600 font-normal">
                Fall occurred on <span className="font-bold">{fallDate}</span>
              </Typography>
            </CardHeader>
            <CardBody className="p-4 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Typography color="blue-gray" className="!font-semibold">
                    Fall Time
                  </Typography>
                  <Typography className="text-gray-600 font-normal">
                    {fallTime}
                  </Typography>
                </div>
                <div>
                  <Typography color="blue-gray" className="!font-semibold">
                    Fall ID
                  </Typography>
                  <Typography className="text-gray-600 font-normal">
                    {tempFall.FallID}
                  </Typography>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    className="border-gray-200 flex items-center justify-center gap-2 w-full md:max-w-fit"
                  >
                    Download Fall Report
                    <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Typography color="blue-gray" className="!font-semibold">
                    Radar ID
                  </Typography>
                  <Typography className="text-gray-600 font-normal">
                    {tempFall.RadarID}
                  </Typography>
                </div>
                <div>
                  <Typography color="blue-gray" className="!font-semibold">
                    Response Status
                  </Typography>
                  <Typography className="text-gray-600 font-normal">
                    {tempFall.ResponseStatus}
                  </Typography>
                </div>
                <div>
                  <Typography color="blue-gray" className="!font-semibold">
                    Responder
                  </Typography>
                  <Typography className="text-gray-600 font-normal">
                    Nurse Bill
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-full space-y-6">
          <Card className="border border-gray-300 !rounded-md shadow-sm">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <Typography color="blue-gray" className="!font-semibold">
                  User Details
                </Typography>
              </div>
              <div className="space-y-2 mt-4">
                <Typography className="text-gray-600 font-normal">
                  John Doe
                </Typography>
                <Typography className="text-gray-600 font-normal">
                  1234 Main Street
                </Typography>
                <Typography className="text-gray-600 font-normal">
                  Apt 321
                </Typography>
                <Typography className="text-gray-600 font-normal">
                  Melbourne, Victoria
                </Typography>
                <Typography className="text-gray-600 font-normal">
                  Australia
                </Typography>
                <Typography className="text-gray-600 font-normal">
                  0412345678
                </Typography>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default FallDocument;
