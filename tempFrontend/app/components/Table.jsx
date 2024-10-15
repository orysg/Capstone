"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Input,
  Chip,
} from "@material-tailwind/react";
import {
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Pagination } from "./Pagination";

function Table() {
  const [fallHistory, setFallHistory] = useState([]);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(fallHistory.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = fallHistory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchFallData");
        const data = await response.json();
        setFallHistory(data);
      } catch (error) {
        console.error("Error fetching fall history data:", error);
      }
    };
    fetchData();
  }, []);

  const TABLE_ROW = paginatedHistory.map((fall) => ({
    fallID: fall.FallID,
    RadarID: fall.RadarID,
    type: fall.FallType,
    Date: new Date(fall.Timestamp).toISOString().split("T")[0],
    Status: fall.ResponseStatus,
    color: fall.type === "Fast" ? "red" : "green",
  }));

  return (
    <section className="m-10">
      <Card className="h-full mx-auto max-w-screen">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
        >
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
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-auto !px-0 py-2">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr>
                <th className="border-b border-gray-300 !p-4 pb-8">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold"
                  >
                    Fall ID
                  </Typography>
                </th>
                <th className="border-b border-gray-300 !p-4 pb-8 hidden md:table-cell">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold"
                  >
                    Radar ID
                  </Typography>
                </th>
                <th className="border-b border-gray-300 !p-4 pb-8">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold"
                  >
                    Type
                  </Typography>
                </th>
                <th className="border-b border-gray-300 !p-4 pb-8">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold"
                  >
                    Date
                  </Typography>
                </th>
                <th className="border-b border-gray-300 !p-4 pb-8">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold"
                  >
                    Status
                  </Typography>
                </th>
                <th className="border-b border-gray-300 !p-4 pb-8">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold"
                  >
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROW.map(
                ({ fallID, RadarID, type, Date, Status }, index) => {
                  const isLast = index === TABLE_ROW.length - 1;
                  const classes = isLast
                    ? "!p-4"
                    : "!p-4 border-b border-gray-300";

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
                      <td className={"${classes} hidden md:table-cell"}>
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
                            color={
                              type === "False"
                                ? "green"
                                : type === "Slow"
                                ? "amber"
                                : "red"
                            }
                          />
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
                }
              )}
            </tbody>
          </table>
          <div className="flex justify-center my-4">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

export default Table;
