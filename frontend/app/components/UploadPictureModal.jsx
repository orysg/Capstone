import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useDropzone } from 'react-dropzone';
 
export default function UploadPicture() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*', // Accept images only
    onDrop: (acceptedFiles) => {
      // Handle the file upload logic here
      console.log(acceptedFiles);
    },
  });

 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Upload Profile Picture
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Upload Profile Picture</DialogHeader>
        <DialogBody>
        <div
            {...getRootProps({
              className: `border-dashed border-2 p-8 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`,
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography variant="h6" color="blue-gray">
                Drop the files here ...
              </Typography>
            ) : (
              <>
                <Typography variant="h6" color="blue-gray">
                  Drag & drop your image here, or click to select
                </Typography>
                <Typography variant="small" className="text-gray-600 mt-2">
                  (Only image files are accepted)
                </Typography>
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}