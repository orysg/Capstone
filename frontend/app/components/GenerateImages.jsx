"use client";
import React, { useState } from "react";
import {
  Typography,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const GenerateImages = () => {
  const [csvFiles, setCsvFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleFolderChange = (event) => {
    const files = event.target.files; // Get all files
    const csvFilesArray = Array.from(files).filter((file) =>
      file.name.endsWith(".csv")
    ); // Filter for .csv files
    setCsvFiles(csvFilesArray); // Update state with the filtered CSV files
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (csvFiles.length === 0) {
      setMessage("Please select a folder containing .csv files.");
      return;
    }

    // Get the path of the first CSV file (you might want to handle multiple CSVs differently)
    const inputDirectory = csvFiles[0].webkitRelativePath.split("/")[0]; // Get the folder path

    try {
      const response = await fetch(
        "http://localhost:4000/api/generate-images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputDirectory }),
        }
      );

      const data = await response.json();
      setMessage(data.message || "Images generated successfully.");
    } catch (error) {
      console.error("Error generating images:", error);
      setMessage("Error generating images.");
    }
  };
  return (
    <div>
      <Card color="transparent" shadow={false}>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center"
        >
          <Typography variant="h5" color="blue-gray">
            Generate Images
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            type="file"
            webkitdirectory="true"
            directory="true"
            onChange={handleFolderChange}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            className="bg-primaryColour text-night hover:bg-secondaryColour"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
      {csvFiles.length > 0 && (
        <ul>
          {csvFiles.map((file, index) => (
            <li key={index}>{file.name}</li> // Displaying names of the CSV files
          ))}
        </ul>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};
export default GenerateImages;
