"use client";
import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import UploadPicture from "./UploadPictureModal";

function Profile() {
  return (
    <section className="container mx-auto px-8 py-10">
      <Card
        shadow={false}
        className="border border-gray-300 rounded-2xl"
      >
        <CardHeader shadow={false} className="h-60 !rounded-lg">
          <Image
            src="https://www.material-tailwind.com/image/dark-image.png"
            alt="dark"
            height={1024}
            width={1024}
            className="w-full h-full object-center"
          />
        </CardHeader>
        <CardBody>
          <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar src="https://www.material-tailwind.com/img/avatar1.jpg" alt="avatar" variant="rounded" />
              <div>
                <Typography color="blue-gray" variant="h6">
                  Emma Roberts
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-gray-600"
                >
                  emma.roberts@mail.com
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
            <UploadPicture />
              <a href="settings/update">
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
              >
                Update Profile
              </Button>
              </a>
            </div>
          </div>
          <Typography
            variant="small"
            className="font-normal text-gray-600 mt-6"
          >
            Passionate Health Practitioner focused on creating a safe and comforting
            patient experience.<br/> Adept at patient advocacy and education with a commitment to ongoing care.
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
}

export default Profile;