import { useState } from "react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import Button from "./Button";

const NavLinks = () => {
  return (
    <>
      <NavLink to={`/`}>
        <div className="py-2">Home</div>
      </NavLink>
      <NavLink to={`/books`}>
        <div className="py-2">Books</div>
      </NavLink>
      <NavLink to={`/create-book`}>
        <Button btnText="Add New Book" isDarkBtn={true} />
      </NavLink>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-amber-50 sticky top-0 z-[20]">
      <div className="container py-4 flex flex-wrap items-center justify-between">
        <h1 className="py-2 playwrite-nl-regular-400">BookHub</h1>

        <nav className="flex justify-end">
          <div className="w-full hidden md:flex gap-9 justify-between">
            <NavLinks />
          </div>
          <div
            className="md:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {!isOpen ? (
              <IoIosMenu
                size={"2em"}
                className="text-slate-400 cursor-pointer"
              />
            ) : (
              <IoIosClose
                size={"2.5em"}
                className="text-blue-900 cursor-pointer"
              />
            )}
          </div>
        </nav>

        {isOpen && (
          <div className="md:hidden flex flex-col gap-2 items-center basis-full">
            <NavLinks />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
