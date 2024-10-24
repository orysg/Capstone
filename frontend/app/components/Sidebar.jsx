"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserGroupIcon,
  InboxIcon,
  Cog6ToothIcon,
  PowerIcon,
  CalendarIcon,
  DocumentIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function DefaultSidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Modal state

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const router = useRouter();

  // Function to handle logout after confirmation
  const handleLogoutConfirm = () => {
    localStorage.removeItem('token'); // Clear any stored token
    localStorage.removeItem('userRole'); // Clear the role
    closeLogoutModal();
    router.push("/signin"); // Redirect to signin page
  };

  // Fetch the user's role from localStorage
  const userRole = localStorage.getItem("userRole"); // e.g., 'Admin' or 'Carer'

  const adminNavList = (
    <>
      <a href="/dashboard">
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Fall History Overview
        </ListItem>
      </a>
      <a href="/dashboard/radar-kit-management">
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Radar Kit Management
        </ListItem>
      </a>
      <a href="/dashboard/user-management">
        <ListItem>
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          User Management
        </ListItem>
      </a>
      <a href="/dashboard/history">
        <ListItem>
          <ListItemPrefix>
            <LightBulbIcon className="h-5 w-5" />
          </ListItemPrefix>
          Carer Activity Tracking
        </ListItem>
      </a>
      <a href="/dashboard/patient-data">
        <ListItem>
          <ListItemPrefix>
            <DocumentIcon className="h-5 w-5" />
          </ListItemPrefix>
          Patient Data Access (Read Only)
        </ListItem>
      </a>
      <a href="/dashboard/settings">
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
      </a>
      <ListItem onClick={openLogoutModal} className="cursor-pointer">
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
    </>
  );

  const carerNavList = (
    <>
      <a href="/dashboard/active-fall-alerts">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Active Fall Alerts
        </ListItem>
      </a>
      <a href="/dashboard/history">
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Fall History
        </ListItem>
      </a>
      <a href="/dashboard/patient-data">
        <ListItem>
          <ListItemPrefix>
            <DocumentIcon className="h-5 w-5" />
          </ListItemPrefix>
          Patient Data Access
        </ListItem>
      </a>
      <a href="/dashboard/settings">
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
      </a>
      <ListItem onClick={openLogoutModal} className="cursor-pointer">
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
    </>
  );

  return (
    <div className="fixed top-4 left-4 z-50 w-12">
      <div>
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2" />
          )}
        </IconButton>
      </div>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card className="w-auto p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2">
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <List>{userRole === "Admin" ? adminNavList : carerNavList}</List>
        </Card>
      </Drawer>

      {/* Modal for logout confirmation */}
      <Dialog open={isLogoutModalOpen} handler={closeLogoutModal}>
        <DialogHeader>Confirm Logout</DialogHeader>
        <DialogBody>
          Are you sure you want to log out?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="gray" onClick={closeLogoutModal}>
            Cancel
          </Button>
          <Button variant="gradient" color="red" onClick={handleLogoutConfirm}>
            Log out
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
