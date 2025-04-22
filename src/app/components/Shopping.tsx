"use client";
import React, { useState } from "react";
import { useCart } from "../context/product";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { RightArrow, LeftArrow } from "../ui/icon";

function Shopping() {
  const { addToCart, quantity, increment, decrement, setQuantity } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const productImages = ["/shoe.png", "/shoe.png", "/shoe.png", "/shoe.png"];

  const toggleItem = (index:any) => {
    if (typeof index === "number") setCurrentIndex(index);
    setShowModal(!showModal);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const product = {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    price: 125.0,
    image: "/shoe.png",
    discount: 0.5,
    originalPrice: 250.0,
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({
        ...product,
        quantity: quantity,
      });
      setQuantity(0);
    }
  };

  return (
    <section className="lg:my-12 p-0 md:p-4">
      <div className="md:grid xl:grid-cols-2 gap-24">
        <div>
          <div className="hidden lg:block">
            <img
              src={product.image}
              alt="shoe image"
              className="w-full rounded-lg"
            />
            <div className="flex gap-6 cursor-pointer mt-8">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => toggleItem(index)}
                  className="rounded-lg cursor-pointer hover:opacity-70"
                >
                  <img
                    src={img}
                    alt={`shoe thumbnail ${index}`}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel for tablet/mobile */}
          <div className="lg:hidden relative">
            <img
              src={productImages[currentIndex]}
              alt="Product Carousel"
              className="w-full h-72 object-cover  rounded-none md:rounded-lg lg:rounded-lg "
            />
            <button
              onClick={prevImage}
              className="absolute hidden md:block left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full"
            >
              <LeftArrow />
            </button>
            <button
              onClick={nextImage}
              className="absolute hidden md:block right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full"
            >
              <RightArrow />
            </button>
          </div>
        </div>

        <div className="place-content-center mt-8 md:mt-0 p-4 md:p-0 lg:p-0">
          <div>
            <h2 className=" font-bold text-sm my-4">
              SNEAKER COMPANY
            </h2>
            <h1 className="text-3xl text-[#1D2026] font-bold my-4">
              {product.name}
            </h1>
            <p className="text-[#69707D] my-4">
              These low-profile sneakers are your perfect casual wear companion...
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div className="text-[#1D2026] font-bold text-2xl">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-white bg-[black] font-bold px-2 rounded-lg">
                {product.discount * 100}%
              </div>
            </div>
            <div className="line-through text-[#B6BCC8]">
              ${product.originalPrice.toFixed(2)}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="bg-[#F6F8FD] w-full p-2 flex items-center justify-between rounded-lg">
              <button
                onClick={decrement}
                disabled={quantity === 0}
                className={`text-2xl font-bold cursor-pointer ${
                  quantity === 0
                    ? "text-[#B6BCC8]"
                    : "text-[#FF7E1B] hover:text-[#FFAB6A]"
                }`}
              >
                -
              </button>
              <span className="text-black text-xl font-bold">{quantity}</span>
              <button
                onClick={increment}
                className="text-[#FF7E1B] text-2xl font-bold cursor-pointer hover:text-[#FFAB6A]"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={quantity === 0}
              className={`flex items-center justify-center p-2 gap-4 w-full rounded-lg font-bold ${
                quantity === 0
                  ? "bg-[#B6BCC8] cursor-not-allowed"
                  : "bg-[#FF7E1B] hover:bg-[#FFAB6A] cursor-pointer"
              }`}
            >
              <img src="/cart.svg" alt="cart icon" />
              <span className="text-black">Add to cart</span>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
          <DialogContent>
            <DialogTitle srOnly>Product Image</DialogTitle>
            <div className="w-full relative">
              <img
                src={productImages[currentIndex]}
                alt="Product"
                className="w-full h-[16rem] rounded-lg object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-orange-500 px-2 py-1 rounded-full"
              >
                <LeftArrow />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-orange-500 px-2 py-1 rounded-full"
              >
                <RightArrow />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}

export default Shopping;
