'use client';
import React from "react";
import { useRouter } from 'next/navigation';
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
  import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

   
  export default function DefaultSidebar() {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [openNav, setOpenNav] = React.useState(false);

    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };
   
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const toggleMobileNav = () => {
        setOpenNav(!openNav);
    };

    // logout
    const router = useRouter();
    const handleLogout = () => {
    localStorage.removeItem("user");
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
            <a href="/history">
                <ListItem>
                    <ListItemPrefix>
                        <CalendarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    History
                </ListItem>
            </a>
            <a href="/testAPI">
                <ListItem>
                    <ListItemPrefix>
                        <BeakerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Test API
                </ListItem>
            </a>
            <a href="/generateImages">
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
                    <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                </ListItemSuffix>
            </ListItem>
            <a href="/report">
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
        <div>
        <div className="absolute top-0 left-0 m-2">
            <IconButton variant="text" size="lg" onClick={openDrawer}>
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8 stroke-2" />
                ) : (
                    <Bars3Icon className="h-8 w-8 stroke-2" />
                )}
            </IconButton>
        </div>

        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        Sidebar
                    </Typography>
                </div>
                <List>
                    {navList}
                </List>
            </Card>
        </Drawer>

        <MobileNav open={openNav} className="block lg:hidden">
            <div className="container mx-auto flex flex-col items-center">
                {navList}
            </div>
        </MobileNav>
        </div>
    );
  }