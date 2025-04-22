"use client";
import Image from "next/image";
import React, { useState } from "react";
import Cart from "./Cart";
import { useCart } from "../context/product";
import { CloseIcon, Hamburger } from "../ui/icon";

function Header() {
  const { showCart, toggleShowCart, totalItems, quantity, cartItems } =
    useCart();

  const [nav, setOpenNav] = useState(false);
  const toggleNav = () => {
    setOpenNav(!nav);
  };
  return (
    <header className="flex justify-between items-center border-b-1  border-opacity-50  py-8">
      <div className="flex items-center space-x-2 lg:space-x-12">
        <div onClick={toggleNav} className="lg:hidden relative">
          <Hamburger />
          {nav && (
            // <div className="absolute w-[15rem] top-0 left-0 p-4 h-screen flex  bg-white z-1000">
            <div
              className={`fixed top-0 left-0 h-screen w-[15rem] bg-white z-[1000] p-4 transform transition-transform duration-300 ease-in-out ${
                nav ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex flex-col space-y-12">
                <div>
                  <CloseIcon className="text-gray-400 font-bold" />
                </div>
                <nav>
                  <ul className="text-black flex flex-col space-y-4 font-bold justify-center">
                    <li>
                      {" "}
                      <a href="#">Collections</a>
                    </li>
                    <li>
                      <a href="#">Men</a>
                    </li>
                    <li>
                      <a href="#">Women</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
        <div>
          <img src="/logo.svg" alt="ecommerce logo" />
        </div>
        <nav className="hidden lg:block">
          <ul className="text-[#69707D] flex items-center gap-4">
            <li>
              {" "}
              <a href="#">Collections</a>
            </li>
            <li>
              <a href="#">Men</a>
            </li>
            <li>
              <a href="#">Women</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button onClick={toggleShowCart} className="cursor-pointer">
            <img src="/cart.svg" alt="cart icon" />
          </button>
          <div className="text-white bg-[#FF7E1B] font-bold px-2 rounded-lg absolute bottom-6 left-2">
            {totalItems}
          </div>
          <div>{showCart && <Cart />}</div>
        </div>

        <div>
          <div>
            <Image
              width={30}
              height={30}
              src="/profile.png"
              alt="profile image"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
