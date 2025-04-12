// "use client";
// import React, { useState } from "react";
// import { useCart } from "../context/product";

// function Shopping() {
//   // const { count, increment, decrement } = useCart();
//   return (
//     <section className="my-12">
//       <div className="md:grid xl:grid-cols-2 gap-24">
//         <div>
//           <div>
//             <img src="/shoe.png" alt="shoe image" />
//           </div>
//           <div className="flex gap-6 mt-8">
//             <div className="rounded-lg">
//               <img src="/shoe.png" alt="shoe image" />
//             </div>
//             <div>
//               <img src="/shoe.png" alt="shoe image" />
//             </div>
//             <div>
//               <img src="/shoe.png" alt="shoe image" />
//             </div>
//             <div>
//               <img src="/shoe.png" alt="shoe image" />
//             </div>
//           </div>
//         </div>
//         <div className="place-content-center">
//           <div>
//             <h2 className="text-[#69707D] my-4">SNEAKER COMPANY</h2>

//             <p className="text-3xl text-[#1D2026] font-bold my-4">
//               Fall Limited Edition Sneakers
//             </p>

//             <p className="text-[#69707D] my-4">
//               These low-profile sneakers are your perfect casual wear companion.
//               Featuring a durable rubber outer sole, they’ll withstand
//               everything the weather can offer.
//             </p>
//             <div className="flex items-center space-x-4 my-4">
//               <div className="text-[#1D2026] font-bold text-2xl">$125.00</div>
//               <div className="text-white bg-black font-bold px-2 rounded-lg">
//                 50%{" "}
//               </div>
//             </div>
//             <div className="line-through text-[#69707D]">$250</div>
//           </div>

//           <div className="flex gap-4 my-6">
//             <div className="bg-[#F6F8FD] w-full p-4 flex items-center justify-between  rounded-lg">
//               <button
//                 onClick={decrement}
//                 className="text-[#FF7E1B] text-2xl font-bold cursor-pointer"
//               >
//                 -
//               </button>{" "}
//               <span className="text-black text-xl">{count}</span>{" "}
//               <button
//                 onClick={increment}
//                 className="text-[#FF7E1B] text-2xl font-bold cursor-pointer"
//               >
//                 +
//               </button>
//             </div>

//             <div className="bg-[#FF7E1B] w-full p-4 flex justify-center rounded-lg cursor-pointer">
//               <button className="flex gap-4 text-[#1D2026] cursor-pointer font-bold">
//                 <span>
//                   <img src="/cart.svg" />
//                 </span>{" "}
//                 Add to cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Shopping;


"use client";
import React, { useState } from "react";
import { useCart } from "../context/product";

function Shopping() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => {
    if (quantity > 0) setQuantity(prev => prev - 1);
  };

  const product = {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    price: 125.00,
    image: "/shoe.png",
    discount: 0.5, // 50% discount
    originalPrice: 250.00
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({
        ...product,
        quantity: quantity
      });
      setQuantity(0); // Reset quantity after adding to cart
    }
  };

  return (
    <section className="my-12">
      <div className="md:grid xl:grid-cols-2 gap-24">
        <div>
          <div>
            <img 
              src="/shoe.png" 
              alt="shoe image" 
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex gap-6 mt-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-lg cursor-pointer hover:opacity-70">
                <img 
                  src="/shoe.png" 
                  alt="shoe thumbnail" 
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="place-content-center mt-8 md:mt-0">
          <div>
            <h2 className="text-[#FF7E1B] font-bold text-sm my-4">
              SNEAKER COMPANY
            </h2>

            <h1 className="text-3xl text-[#1D2026] font-bold my-4">
              {product.name}
            </h1>

            <p className="text-[#69707D] my-4">
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they'll withstand
              everything the weather can offer.
            </p>
            
            <div className="flex items-center space-x-4 my-4">
              <div className="text-[#1D2026] font-bold text-2xl">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-white bg-[#FF7E1B] font-bold px-2 rounded-lg">
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
                  quantity === 0 ? "text-[#B6BCC8]" : "text-[#FF7E1B] hover:text-[#FFAB6A]"
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
              className={`flex items-center justify-center gap-4 w-full  rounded-lg font-bold ${
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
    </section>
  );
}

export default Shopping;