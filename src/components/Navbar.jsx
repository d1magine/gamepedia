import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

import { HiOutlineSearch } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdLogin } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { GoPersonAdd } from "react-icons/go";

const Navbar = forwardRef((props, ref) => {
  return (
    <nav className="relative flex items-center justify-between gap-3 pt-3 mobile:gap-5 mobile:pt-6">
      <Link className="font-bold uppercase mobile:text-xl" to="/">
        gamepedia
      </Link>
      <div className="relative flex-1">
        <HiOutlineSearch
          size="19px"
          className="absolute left-3.5 top-1/2 mt-[-9px]"
        />
        <input
          className="w-full rounded-md bg-[#3D3F43] px-5 py-2 pl-10 text-sm placeholder:text-[#ffffffb3] focus:outline-none focus:ring-1 focus:ring-white mobile:py-2.5 mobile:pl-11 mobile:text-base"
          type="text"
          placeholder="Search games"
        />
      </div>
      <Link
        className="hidden rounded px-4 py-1.5 text-sm font-bold duration-200 hover:opacity-70 mobile:block"
        to="/login"
      >
        Log In
      </Link>
      <Link
        className="hidden rounded bg-white px-4 py-1.5 text-sm font-bold text-black duration-200 hover:opacity-70 mobile:block"
        to="/signup"
      >
        Sign Up
      </Link>
      <RxHamburgerMenu
        onClick={() => props.setMenuIsActive(true)}
        size="22px"
        className="cursor-pointer mobile:hidden"
      />
      {/* Мобильное меню */}
      <div
        ref={ref}
        className={`fixed right-1.5 top-1.5 z-50 duration-150 ease-linear ${
          props.menuIsActive ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="w-40 rounded-lg bg-white p-4 text-black">
          <li className="mb-2 flex justify-end">
            <GrClose
              className="cursor-pointer"
              onClick={() => props.setMenuIsActive(false)}
              size="20px"
            />
          </li>
          <li className="mb-3 flex items-center gap-2 text-lg">
            <MdLogin size="24px" />
            <Link onClick={() => props.setMenuIsActive(false)} to={"/login"}>
              Log In
            </Link>
          </li>
          <li className="flex items-center gap-2 text-lg">
            <GoPersonAdd size="24px" />
            <Link onClick={() => props.setMenuIsActive(false)} to={"/signup"}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
