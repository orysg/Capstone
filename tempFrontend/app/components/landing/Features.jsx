"use client";
import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  ClockIcon,
  BellAlertIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

export function FeatureSection() {
  return (
    <section className="lg:py-28 py-10 px-8">
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          Features
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-4 !text-2xl font-bold lg:!text-4xl"
        >
          Enhance Safety with FrontGuard
        </Typography>
        <Typography variant="lead" className="mx-auto max-w-lg !text-gray-500">
          FrontGuard combines advanced radar technology and real-time monitoring
          to provide an unparalleled fall detection service. Our system not only
          alerts caregivers instantly but also ensures peace of mind for users,
          enhancing their safety and overall well-being.
        </Typography>
      </div>
      <div className="mb-8 container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card
          className="col-span-1 bg-gray-100/50 overflow-hidden"
          shadow={false}
        >
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Real-Time Monitoring
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              FrontGuard utilizes advanced radar technology to continuously
              monitor movements, ensuring immediate detection of any falls. This
              allows for prompt intervention, enhancing safety and peace of mind
              for users and caregivers.
            </Typography>
            <div className="flex justify-center">
              <ClockIcon className="w-24 h-24 text-gray-500" />{" "}
            </div>
          </CardBody>
        </Card>
        <Card
          className="col-span-1 bg-gray-100/50 overflow-hidden"
          shadow={false}
        >
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Instant Notifications
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Receive instant alerts via mobile notifications or SMS whenever a
              fall is detected. FrontGuard ensures that caregivers and family
              members are immediately informed, enabling swift response in
              critical situations.
            </Typography>
            <div className="flex justify-center">
              <BellAlertIcon className="w-24 h-24 text-gray-500" />
            </div>
          </CardBody>
        </Card>
        <Card
          className="col-span-1 bg-gray-100/50 overflow-hidden"
          shadow={false}
        >
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Historical Fall Data
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Keep track of fall incidents with comprehensive historical data.
              FrontGuard records the time, date, and context of each event,
              allowing users and caregivers to identify patterns and adjust
              safety measures accordingly.
            </Typography>
            <div className="flex justify-center">
              <CalendarIcon className="w-24 h-24 text-gray-500" />
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
export default FeatureSection;
