import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";


const NavigationBar = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

      <Typography
        as="li"
        type="small"
        className="p-1 font-normal"
      >
        <Link to='/' className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        type="small"
        className="p-1 font-normal"
      >
        <Link to='/upload' className="flex items-center">
          Upload
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="fixed top-0 z-10 h-max max-w-full bg-gray-900 text-white rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between ">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium capitalize"
        >
          pdf manager
        </Typography>
        <div className="mr-4 hidden lg:block">{navList}</div>
        <Button
          variant="outline"
          size="sm"
          className="hidden lg:inline-block"
        >
        </Button>
        <IconButton
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {navList}
        <Button isFullWidth variant="gradient" size="sm" className="">
          <span>Get started</span>
        </Button>
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar