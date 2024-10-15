"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  MobileNav,
  Chip,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  BeakerIcon,
  PhotoIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  CalendarIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function DefaultSidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [openNav, setOpenNav] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // logout
  const router = useRouter();
  const handleLogout = () => {
    router.push("/signin");
  };

  const navList = (
    <>
      <a href="/dashboard">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
      </a>
      <a href="/dashboard/history">
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className="h-5 w-5" />
          </ListItemPrefix>
          History
        </ListItem>
      </a>
      <a href="/dashboard/testAPI">
        <ListItem>
          <ListItemPrefix>
            <BeakerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Test API
        </ListItem>
      </a>
      <a href="/dashboard/generateImages">
        <ListItem>
          <ListItemPrefix>
            <PhotoIcon className="h-5 w-5" />
          </ListItemPrefix>
          Generate Images
        </ListItem>
      </a>
      <ListItem>
        <ListItemPrefix>
          <InboxIcon className="h-5 w-5" />
        </ListItemPrefix>
        Inbox
        <ListItemSuffix>
          <Chip
            value="14"
            size="sm"
            variant="ghost"
            color="blue-gray"
            className="rounded-full"
          />
        </ListItemSuffix>
      </ListItem>
      <a href="/dashboard/report">
        <ListItem>
          <ListItemPrefix>
            <DocumentIcon className="h-5 w-5" />
          </ListItemPrefix>
          Reports
        </ListItem>
      </a>
      <ListItem>
        <ListItemPrefix>
          <UserCircleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Profile
      </ListItem>
      <ListItem>
        <ListItemPrefix>
          <Cog6ToothIcon className="h-5 w-5" />
        </ListItemPrefix>
        Settings
      </ListItem>
      <a href="/">
        <ListItem onClick={handleLogout} className="cursor-pointer">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </a>
    </>
  );

  return (
    <div className="w-12">
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
          <div className="mb-2 ">
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <List>{navList}</List>
        </Card>
      </Drawer>

      <MobileNav open={openNav} className="lg:hidden block">
        <div>{navList}</div>
      </MobileNav>
    </div>
  );
}
