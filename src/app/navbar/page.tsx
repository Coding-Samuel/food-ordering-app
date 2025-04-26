'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaBars } from 'react-icons/fa';

const NavBar:React.FC = () => {
  const [navLinks, setNavLinks] = useState<boolean>(false);

  function navLinkSetter():void {
    setNavLinks(prev => !prev);
  }

  return (
    <>
      {/* Main Nav Bar */}
      <div className="flex justify-between items-center px-6 py-3 shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            className="rounded-3xl"
            src="/logo.jpg"
            alt="Logo"
            width={50}
            height={50}
          />
          <h1 className="text-amber-400 text-lg uppercase">React Foods</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex text-amber-400 gap-4 text-lg items-center">
          <Link
            className="hover:bg-amber-400 py-1 px-3 hover:text-white transition rounded-xl"
            href="/"
          >
            Home
          </Link>
          <Link
            className="hover:bg-amber-400 py-1 px-3 hover:text-white transition rounded-xl"
            href="/Menu"
          >
            Menu
          </Link>
          <div className="flex items-center hover:bg-amber-400 py-1 px-3 hover:text-white transition rounded-xl">
            <FaShoppingCart className="text-xl mr-1" />
            <p>(0)</p>
          </div>
          <div className="text-sm">
            <Link
              className="rounded-l-2xl bg-amber-400 text-black px-4 py-2 hover:text-white transition"
              href="/Sign-up"
            >
              Sign Up
            </Link>
            <Link
              className="bg-black text-white px-4 py-2 rounded-r-2xl hover:text-amber-400 transition"
              href="/Login"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-amber-400 text-2xl" onClick={navLinkSetter}>
          <FaBars />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {navLinks && (
        <div className="absolute top-18 right-0  md:hidden bg-black p-6">
          <div className="flex flex-col text-amber-400 gap-4">
            <Link className="text-lg" href="/">Home</Link>
            <Link className="text-lg" href="/Menu">Menu</Link>
            <Link className="text-lg" href="/Sign-up">Sign Up</Link>
            <Link className="text-lg" href="/Login">Login</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
