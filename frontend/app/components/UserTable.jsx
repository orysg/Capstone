"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
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
  const [editUser, setEditUser] = useState(null); // Holds the user being edited
  const [showEditModal, setShowEditModal] = useState(false); // Toggles edit modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Toggles delete modal visibility
  const [deleteUserId, setDeleteUserId] = useState(null); // Holds user ID for deletion

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  // Fetch users on component load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Delete function
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${deleteUserId}`);
      setUsers(users.filter((user) => user.userid !== deleteUserId));
      setShowDeleteModal(false); // Close the delete modal after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit function to open the modal
  const handleEdit = (user) => {
    setEditUser(user); // Set the current user to be edited
    setShowEditModal(true); // Show the edit modal
  };

  // Save changes after editing
  const handleSaveEdit = async () => {
    try {
      console.log('Saving user data:', editUser); 
      const response = await axios.put(`http://localhost:4000/api/users/${editUser.userid}`, editUser);
      setUsers(users.map((user) => (user.userid === editUser.userid ? response.data : user)));
      setShowEditModal(false); // Hide the modal
      setEditUser(null); // Clear the edit user state
    } catch (error) {
      console.error("Error saving edited user:", error);
      console.log("Error details:", error.response?.data);
    }
  };

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
              {paginatedUsers.map((user, index) => (
                <tr key={user.userid || index}>
                  <td className="!p-4 border-b border-gray-300">
                    <Typography variant="small" className="!font-normal text-gray-600 text-left md:text-center">
                      {user.userid || `No ID (${index})`}
                    </Typography>
                  </td>
                  <td className="!p-4 border-b border-gray-300">
                    <Typography variant="small" className="!font-normal text-gray-600 text-left md:text-center">
                      {user.firstname} {user.lastname}
                    </Typography>
                  </td>
                  <td className="!p-4 border-b border-gray-300">
                    <Typography variant="small" className="!font-normal text-gray-600 text-left md:text-center">
                      {user.email}
                    </Typography>
                  </td>
                  <td className="!p-4 border-b border-gray-300 hidden md:table-cell">
                    <Typography variant="small" className="!font-normal text-gray-600 text-left md:text-center">
                      {user.usertype}
                    </Typography>
                  </td>
                  <td className="!p-4 border-b border-gray-300 hidden md:table-cell">
                    <div className="flex justify-center">
                      <IconButton variant="text" size="sm" onClick={() => handleEdit(user)}>
                        <PencilIcon className="h-5 w-5 text-gray-900" />
                      </IconButton>
                      <IconButton variant="text" size="sm" onClick={() => {
                        setDeleteUserId(user.userid);
                        setShowDeleteModal(true); // Show the delete confirmation modal
                      }}>
                        <TrashIcon className="h-5 w-5 text-gray-900" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center my-4">
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          </div>
        </CardBody>
      </Card>

      {/* Edit User Modal */}
      <Dialog open={showEditModal} handler={setShowEditModal}>
        <DialogHeader>Edit User</DialogHeader>
        <DialogBody divider>
        <div className="flex flex-col gap-4">
          <Input
            label="First Name"
            value={editUser?.firstname || ""}
            onChange={(e) => setEditUser({ ...editUser, firstname: e.target.value })}
          />
          <Input
            label="Last Name"
            value={editUser?.lastname || ""}
            onChange={(e) => setEditUser({ ...editUser, lastname: e.target.value })}
          />
          <Input
            label="Email"
            value={editUser?.email || ""}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <Input
            label="Role"
            value={editUser?.usertype || ""}
            onChange={(e) => setEditUser({ ...editUser, usertype: e.target.value })}
          />
        </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="text" color="blue" onClick={handleSaveEdit}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} handler={setShowDeleteModal}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this user?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="blue" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="text" color="red" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}

export default UserTable;
