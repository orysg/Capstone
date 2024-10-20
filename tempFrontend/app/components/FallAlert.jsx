import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Card,
} from "@material-tailwind/react";

export default function FallAlert() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Card className="h-full mx-auto w-full max-w-[48rem] flex flex-col p-6">
      <Typography
        variant="h4"
        color="blue-gray"
        className="mb-2 text-center md:text-left"
      >
        No Falls Currently Detected
      </Typography>
      <Typography color="blue-gray" className="mb-2 text-center md:text-left">
        Time Since Last Fall: 24h
      </Typography>
      <Typography color="blue-gray" className="mb-2 text-center md:text-left">
        Falls That Require Attention
      </Typography>
      <Typography color="blue-gray" className="mb-2 text-center md:text-left">
        Fall Reports That Require Attention...
      </Typography>
      <Typography color="blue-gray" className="mb-4 text-center md:text-left">
        Notices...
      </Typography>
      <Button
        onClick={handleOpen}
        variant="gradient"
        className="self-center md:self-start"
      >
        Open Fall Alert
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-red-500 text-white animate-pulse"
      >
        <DialogHeader>Fall Detected</DialogHeader>
        <DialogBody>
          <Typography className="font-normal text-white">
            A fall has been detected.
            <br />
            Details:
            <br />
            Time: 12:45
            <br />
            Location: Room 204
            <br />
            Please check on the individual to ensure their safety.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="white"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Dismiss</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>View More Info</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
