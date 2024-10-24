"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Pagination } from "./Pagination";
import axios from "axios"; // To handle API requests

function UserTable() {
  const [users, setUsers] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        console.log("User data:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${userId}`);
      setUsers(users.filter((user) => user.UserID !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Create TABLE_ROW by mapping through paginatedUsers
  const TABLE_ROW = paginatedUsers.map((user, index) => {
    const key = user.userid ? `user-${user.userid}` : `user-${index}`;  // Fallback to index if userid is undefined
    const isLast = index === paginatedUsers.length - 1;
    const classes = isLast ? "!p-4" : "!p-4 border-b border-gray-300";
  
    return (
      <tr key={key}>
        <td className={classes}>
          <Typography
            variant="small"
            className="!font-normal text-gray-600 text-left md:text-center"
          >
            {user.userid || `No ID (${index})`} {/* Use lowercase userid */}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            variant="small"
            className="!font-normal text-gray-600 text-left md:text-center"
          >
            {user.firstname} {user.lastname} {/* Use lowercase firstname and lastname */}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            variant="small"
            className="!font-normal text-gray-600 text-left md:text-center"
          >
            {user.email} {/* Use lowercase email */}
          </Typography>
        </td>
        <td className={`${classes} hidden md:table-cell`}>
          <Typography
            variant="small"
            className="!font-normal text-gray-600 text-left md:text-center"
          >
            {user.usertype} {/* Use lowercase usertype */}
          </Typography>
        </td>
        <td className={`${classes} hidden md:table-cell`}>
          <div className="flex justify-center">
            <IconButton variant="text" size="sm">
              <PencilIcon className="h-5 w-5 text-gray-900" />
            </IconButton>
            <IconButton variant="text" size="sm" onClick={() => handleDelete(user.userid)}>
              <TrashIcon className="h-5 w-5 text-gray-900" />
            </IconButton>
          </div>
        </td>
      </tr>
    );
  });
  

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
              User Management
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
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border-b border-gray-300">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-left md:text-center"
                  >
                    User ID
                  </Typography>
                </th>
                <th className="border-b border-gray-300">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-left md:text-center"
                  >
                    Name
                  </Typography>
                </th>
                <th className="border-b border-gray-300">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-left md:text-center"
                  >
                    Email
                  </Typography>
                </th>
                <th className="border-b border-gray-300 hidden md:table-cell">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-left md:text-center"
                  >
                    Role
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
              {TABLE_ROW}
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

export default UserTable;
