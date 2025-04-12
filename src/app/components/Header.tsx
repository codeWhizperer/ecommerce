"use client";
import Image from "next/image";
import React, { useState } from "react";
import Cart from "./Cart";
import { useCart } from "../context/product";

function Header() {
 const {showCart, toggleShowCart, totalItems} = useCart()
  return (
    <header className="flex justify-between items-center border-b-1 border-[#979797] border-opacity-50  py-8">
      <div className="flex items-center space-x-12">
        <div>
          <img src="/logo.svg" alt="ecommerce logo" />
        </div>
        <nav>
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
          <div>
            {
                showCart &&  <Cart />
            }
          </div>
        </div>

        <div>
          <div>
            <Image
              width={50}
              height={50}
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
