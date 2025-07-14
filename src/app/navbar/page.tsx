'use client';
import React, { useCallback, useState,useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import CartModal from '../components/Cart/CartModal';

const NavBar:React.FC = () => {
  const [isScrolled, setScrolled] =  useState(false);

  useEffect(()=>{
    const handleScroll = ()=> (
      setScrolled(window.scrollY > 10)
    );
    window.addEventListener("scroll", handleScroll);

    return ()=> (window.removeEventListener("scroll", handleScroll))
  }, [])
  const dialog = useRef();
  const [navLinks, setNavLinks] = useState<boolean>(false);

  const navLinkSetter = useCallback(()=>{
    setNavLinks(prev => !prev);
  },[])

  const handleOpenModal = ()=>{
    dialog.current?.open();
  }
  return (
    <>
      <CartModal ref={dialog}/>
      {/* Main Nav Bar */}
      <div className={`${isScrolled && "navbar-bg shadow-md"} z-10 flex justify-between px-6 py-2 transition w-full fixed top-0`}>
        {/* Logo */}
        <div className="flex items-center  gap-8">
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
          <div className="flex items-center hover:bg-amber-400 py-2 px-3 hover:text-white transition rounded-xl" onClick={handleOpenModal}>
            <FaShoppingCart className="text-xl mr-1"/>
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
        <div className="md:hidden  text-amber-400 text-2xl" onClick={navLinkSetter}>
          <FaBars className={`${navLinks && "bg-amber-400 text-white "} text-4xl p-2 hover:bg-amber-400 hover:text-white transition`}/>
          {/* Mobile Menu Dropdown */}
        
            <div className={`${navLinks && "bg-red-300"} `}>
            <div className={`${navLinks? "translate-x-0":"translate-x-24"} absolute top-20 right-0  z-30 w-24 transition bg-black`}>
              <div className="flex flex-col  text-amber-400 gap-4 w-full">
                <Link className="text-lg hover:text-white transition hover:bg-amber-400 w-full px-3 py-1" href="/">Home</Link>
                <Link className="text-lg hover:text-white transition hover:bg-amber-400 w-full px-3 py-1" href="/Menu">Menu</Link>
                <Link className="text-lg hover:text-white transition hover:bg-amber-400 w-full px-3 py-1" href="/Sign-up">Sign Up</Link>
                <Link className="text-lg hover:text-white transition hover:bg-amber-400 w-full px-3 py-1" href="/Login">Login</Link>
                <p onClick={handleOpenModal} className="text-lg hover:text-white transition hover:bg-amber-400 px-3 py-1 ">Cart</p>
              </div>
            </div>
            </div>
            
        </div>
      </div>
    </>
  );
};

export default NavBar;
