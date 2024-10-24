"use client";
import React from "react";
import Image from "next/image";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  CommandLineIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const NavbarDefault = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/*
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium text-night"
      >
        <SparklesIcon className="h-5 w-5 text-neutral" />
        <a href="#" className="flex items-center">
          Features
        </a>
      </Typography>
      */}
      {/*
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium text-night"
      >
        <QuestionMarkCircleIcon className="h-5 w-5 text-neutral" />
        <a href="#" className="flex items-center">
          About
        </a>
      </Typography>
      */}
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium text-night"
      >
        <CommandLineIcon className="h-5 w-5 text-neutral" />
        <a
          href="https://github.com/orysg/Capstone"
          className="flex items-center"
        >
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/logo192.png"
            alt="logo"
            width={32}
            height={32}
            className="h-8 w-8 mr-2"
          />
          <Typography
            variant="h5"
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-mediSum text-primaryColour"
          >
            FrontGuard
          </Typography>
        </div>

        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <a href="/signin">
            <Button
              variant="text"
              size="sm"
              className="hidden lg:inline-block text-primaryColour hover:text-secondaryColour"
            >
              <span>Log In</span>
            </Button>
          </a>
          <a href="/signup">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block bg-secondaryColour text-night hover:bg-primaryColour"
            >
              <span>Sign up</span>
            </Button>
          </a>
        </div>
        <IconButton
          variant="filled"
          className="ml-auto h-7 w-7 text-lavenderWeb bg-primaryColour hover:bg-secondaryColour focus:bg-secondary-Colour active:bg-secondaryColour lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto flex flex-col items-center">
          {navList}
          <div className="flex items-center gap-x-1 justify-center">
            <a href="/signin">
              <Button
                fullWidth
                variant="text"
                size="sm"
                className="text-primaryColour hover:text-secondaryColour"
              >
                <span>Log In</span>
              </Button>
            </a>
            <a href="/signup">
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className="bg-secondaryColour text-night hover:bg-primaryColour"
              >
                <span>Sign Up</span>
              </Button>
            </a>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
};
export default NavbarDefault;
