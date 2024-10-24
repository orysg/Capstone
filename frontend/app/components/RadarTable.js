"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { Typography, Card, CardHeader, CardBody, IconButton, Input } from "@material-tailwind/react";
import { PencilIcon, TrashIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Pagination } from "./Pagination";

function RadarTable() {
  const [radars, setRadars] = useState([]);
  const [editRadar, setEditRadar] = useState(null); // Holds the radar being edited
  const [showEditModal, setShowEditModal] = useState(false); // Toggles edit modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Toggles delete modal visibility
  const [deleteRadarId, setDeleteRadarId] = useState(null); // Holds radar ID for deletion
  const [showAddModal, setShowAddModal] = useState(false); // Toggles add modal visibility
  const [newRadar, setNewRadar] = useState({ IP: "", Latitude: "", Longitude: "" }); // Holds the new radar data

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(radars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRadars = radars.slice(startIndex, startIndex + itemsPerPage);

  // Fetch radars on component load
  useEffect(() => {
    const fetchRadars = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/radars");
        const data = await response.json();
        console.log(data);
        setRadars(data);
      } catch (error) {
        console.error("Error fetching radars:", error);
      }
    };
    fetchRadars();
  }, []);

  // Delete function
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:4000/api/radars/${deleteRadarId}`, {
        method: "DELETE",
      });
      setRadars(radars.filter((radar) => radar.RadarID !== deleteRadarId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting radar:", error);
    }
  };

  // Edit function to open the modal
  const handleEdit = (radar) => {
    setEditRadar(radar); // Set the current radar to be edited
    setShowEditModal(true); // Show the edit modal
  };

  // Save changes after editing
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/radars/${editRadar.RadarID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRadar),
      });
      const updatedRadar = await response.json();
      setRadars(radars.map((radar) => (radar.RadarID === editRadar.RadarID ? updatedRadar : radar)));
      setShowEditModal(false);
      setEditRadar(null);
    } catch (error) {
      console.error("Error saving edited radar:", error);
    }
  };

  // Add new radar function
  const handleAddRadar = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/radars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRadar),
      });
      const addedRadar = await response.json();
      setRadars([...radars, addedRadar]);
      setNewRadar({ IP: "", Latitude: "", Longitude: "" });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding radar:", error);
    }
  };

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <Card className="h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none flex flex-wrap gap-4 justify-between mb-4">
          <div className="mb-8 flex items-center justify-between gap-8">
            <Typography variant="h5" color="blue-gray">
              Radar Kit Management
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-hidden !px-0 py-2">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border-b border-gray-300">
                  <Typography color="blue-gray" variant="small" className="!font-bold text-left md:text-center">
                    Radar ID
                  </Typography>
                </th>
                <th className="border-b border-gray-300">
                  <Typography color="blue-gray" variant="small" className="!font-bold text-left md:text-center">
                    IP
                  </Typography>
                </th>
                <th className="border-b border-gray-300">
                  <Typography color="blue-gray" variant="small" className="!font-bold text-left md:text-center">
                    Latitude
                  </Typography>
                </th>
                <th className="border-b border-gray-300">
                  <Typography color="blue-gray" variant="small" className="!font-bold text-left md:text-center">
                    Longitude
                  </Typography>
                </th>
                <th className="border-b border-gray-300 hidden md:table-cell">
                  <Typography color="blue-gray" variant="small" className="!font-bold text-left md:text-center">
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRadars.map((radar, index) => (
                <tr key={radar.RadarID || index}>
                  <td className="!p-4 border-b border-gray-300">
                    <Typography variant="small" className="!font-normal text-gray-600 text-left md:text-center">
                      {radar.RadarID || `No ID (${index})`}
                    </Typography>
                  </td>
                  <td className="!p-4 border-b border-gray-300">
                    <Typography variant="small" className="!font-normal text-gray-600 text-left md:text-center">
                      {radar.IP}
                    </Typography>
                  </td>
                  <td className="!p-4 border-b border-gray-300">
                    <Typography variant="small" className="!font-normal text-gray-600 text-left md:text-center">
                      {radar.Latitude}
                    </Typography>
                  </td>
                  <td className="!p-4 border-b border-gray-300">
                    <Typography variant="small" className="!font-normal text-gray-600 text-left md:text-center">
                      {radar.Longitude}
                    </Typography>
                  </td>
                  <td className="!p-4 border-b border-gray-300 hidden md:table-cell">
                    <div className="flex justify-center">
                      <IconButton variant="text" size="sm" onClick={() => handleEdit(radar)}>
                        <PencilIcon className="h-5 w-5 text-gray-900" />
                      </IconButton>
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => {
                          setDeleteRadarId(radar.RadarID);
                          setShowDeleteModal(true);
                        }}
                      >
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

      {/* Add Radar Button (Fixed to bottom right) */}
      <div className="fixed bottom-8 right-8">
        <Button color="blue" onClick={() => setShowAddModal(true)}>
          <PlusIcon className="h-5 w-5" /> Add Radar
        </Button>
      </div>

      {/* Edit Radar Modal */}
      <Dialog open={showEditModal} handler={setShowEditModal}>
        <DialogHeader>Edit Radar</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <Input
              label="IP"
              value={editRadar?.IP || ""}
              onChange={(e) => setEditRadar({ ...editRadar, IP: e.target.value })}
            />
            <Input
              label="Latitude"
              value={editRadar?.Latitude || ""}
              onChange={(e) => setEditRadar({ ...editRadar, Latitude: e.target.value })}
            />
            <Input
              label="Longitude"
              value={editRadar?.Longitude || ""}
              onChange={(e) => setEditRadar({ ...editRadar, Longitude: e.target.value })}
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

      {/* Add Radar Modal */}
      <Dialog open={showAddModal} handler={setShowAddModal}>
        <DialogHeader>Add New Radar</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <Input label="IP" value={newRadar.IP} onChange={(e) => setNewRadar({ ...newRadar, IP: e.target.value })} />
            <Input
              label="Latitude"
              value={newRadar.Latitude}
              onChange={(e) => setNewRadar({ ...newRadar, Latitude: e.target.value })}
            />
            <Input
              label="Longitude"
              value={newRadar.Longitude}
              onChange={(e) => setNewRadar({ ...newRadar, Longitude: e.target.value })}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="text" color="blue" onClick={handleAddRadar}>
            Add Radar
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} handler={setShowDeleteModal}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this radar?
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

export default RadarTable;