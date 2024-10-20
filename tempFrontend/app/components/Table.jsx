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
import fallHistoryData from "../../public/data/fallHistory.json";

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
    const sortedData = fallHistoryData.sort(
      (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
    );
    setFallHistory(sortedData);
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
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <Card className="h-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <Typography variant="h5" color="blue-gray">
              Recent Fall List
            </Typography>
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
        <CardBody className="overflow-hidden !px-0 py-2">
          {" "}
          {/* Prevent overflow */}
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border-b border-gray-300">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-left md:text-center"
                  >
                    Fall ID
                  </Typography>
                </th>
                <th className="border-b border-gray-300 hidden md:table-cell">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-left md:text-center"
                  >
                    Radar ID
                  </Typography>
                </th>
                <th className="border-b border-gray-300">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-center"
                  >
                    Type
                  </Typography>
                </th>
                <th className="border-b border-gray-300">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-center"
                  >
                    Date
                  </Typography>
                </th>
                <th className="border-b border-gray-300 hidden md:table-cell">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-left md:text-center"
                  >
                    Status
                  </Typography>
                </th>
                <th className="border-b border-gray-300 hidden md:table-cell">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-left md:text-center"
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
                          className="!font-normal text-gray-600 text-left md:text-center"
                        >
                          {fallID}
                        </Typography>
                      </td>
                      <td className={`${classes} hidden md:table-cell`}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-center"
                        >
                          {RadarID}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex justify-start md:justify-center items-center">
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
                          className="!font-normal text-gray-600 text-left md:text-center"
                        >
                          {Date}
                        </Typography>
                      </td>
                      <td className={`${classes} hidden md:table-cell`}>
                        <Typography
                          variant="small"
                          className="!font-bold text-left md:text-center"
                        >
                          {Status}
                        </Typography>
                      </td>
                      <td className={`${classes} hidden md:table-cell`}>
                        <div className="flex justify-center">
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
