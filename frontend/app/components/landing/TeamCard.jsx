"use client";
import {
  Card,
  CardBody,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";

function TeamCard({ img, name, title }) {
  return (
    <Card className="rounded-lg bg-[#FAFAFA]" shadow={false}>
      <CardBody className="text-center">
        <Avatar
          src={img}
          alt={name}
          variant="circular"
          size="xxl"
          className="mx-auto mb-6 object-top"
        />
        <Typography
          variant="h5"
          color="blue-gray"
          className="!font-medium text-lg"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-2 !text-base !font-semibold text-gray-600"
        >
          {title}
        </Typography>
        <div className="flex items-center justify-center gap-1.5">
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-twitter text-lg" />
          </IconButton>
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-linkedin text-lg" />
          </IconButton>
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-dribbble text-lg" />
          </IconButton>
        </div>
      </CardBody>
    </Card>
  );
}

const members = [
  {
    img: "/images/team/Alex.png",
    name: "Alex Villani",
    title: "Co-Founder",
  },
  {
    img: "/images/team/Daniel.png",
    name: "Daniel Dunning",
    title: "Co-Founder",
  },
  {
    img: "/images/team/Jess.png",
    name: "Jessica Wrate",
    title: "Co-Founder",
  },
  {
    img: "/images/team/Sam.png",
    name: "Samuel Connor",
    title: "Co-Founder",
  },
  {
    img: `/images/team/jazib.png`,
    name: "Jazib Azam",
    title: "Co-Founder",
  },
];

export function TeamSection12() {
  return (
    <section className="min-h-screen py-8 px-8 lg:py-28">
      <div className="container mx-auto">
        <div className="mb-16 text-center lg:mb-28">
          <Typography variant="h6" color="blue-gray" className="text-lg">
            Meet the Team
          </Typography>
          <Typography
            variant="h1"
            color="blue-gray"
            className="my-2 !text-2xl lg:!text-4xl"
          >
            Behind the Success: Our Dedicated Team
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full !text-gray-500 max-w-4xl"
          >
            From visionary leadership to creative talent, and technical wizards,
            each team member plays a pivotal role in delivering the exceptional
            service and innovative solutions.
          </Typography>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {/* First row with 3 team cards */}
          {members.slice(0, 3).map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
          {/* Second row with 2 team cards centered */}
          {members.slice(3, 5).map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
          {/* Empty cell for centering */}
        </div>
      </div>
    </section>
  );
}

export default TeamSection12;
