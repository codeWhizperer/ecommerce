// import React from 'react'
// import { useCart } from '../context/product';

import { useCart } from "../context/product";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }

// function Cart() {
//     // const {count} = useCart()

//     const total:number = 125 * count;
//   return (
//     <div className="bg-[#FFFFFF] w-[360px] h-[256px] shadow-lg absolute rounded-lg top-[3rem] left-[-9rem]">
//       <div className="flex flex-col h-full">
//         <p className="border-b p-4 text-[#1D2026] font-bold">Cart</p>
//         <div className="flex flex-1 items-center justify-center">
//             {count === 0 ? <p className="text-center text-[#69707D]">Your cart is empty</p> : <Item count={count} total={total}/>}
          
//         </div>
//       </div>
//     </div>
//   );
  

// }

// export default Cart




// const  Item = ({count, total}: {count:number, total:number}) => {
//   return (
//     <div className=''>
//     <div className='flex gap-2 mb-8'>
//         <div className='w-[52px] h-[52px]'>
//             <img src="/shoe.png" alt="shoe picture" />
//         </div>

//         <div className='text-[#69707D]'>
//             <p>Fall Limited Edition Stickers</p>
//             <p><span> $125.00 * {count} = </span> <span className='text-black font-bold'> ${total}.00</span> </p> 
//         </div>
//     </div>
//     <button className='bg-[#FF7E1B] rounded-lg w-full p-2 text-black font-bold cursor-pointer'>Checkout</button>

//     </div>
//   )
// }

function Cart() {
    const { cartItems, totalItems, totalPrice, clearCart, showCart, toggleShowCart } = useCart();
  
    if (!showCart) return null;
  
    return (
      <div className="bg-[#FFFFFF] w-[360px] h-[256px] shadow-lg absolute rounded-lg top-[3rem] left-[-9rem] z-50">
        <div className="flex flex-col h-full">
          <p className="border-b p-4 text-[#1D2026] font-bold">Cart</p>
          <div className="flex flex-1 items-center justify-center">
            {totalItems === 0 ? (
              <p className="text-center text-[#69707D]">Your cart is empty</p>
            ) : (
              <div className="p-4 w-full">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
                <div className="mt-4">
                  <button 
                    onClick={clearCart}
                    className="bg-[#FF7E1B] rounded-lg w-full p-2 text-white font-bold cursor-pointer hover:bg-[#FFAB6A]"
                  >
                    Checkout (${totalPrice.toFixed(2)})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default Cart;
  const CartItem = ({ item }: { item: CartItem }) => {
    const { removeFromCart } = useCart();
  
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12">
            <img src={item.image} alt={item.name} className="w-full h-full rounded" />
          </div>
          <div className="text-[#69707D]">
            <p>{item.name}</p>
            <p>
              ${item.price.toFixed(2)} × {item.quantity} = 
              <span className="text-black font-bold"> ${(item.price * item.quantity).toFixed(2)}</span>
            </p>
          </div>
        </div>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-[#C3CAD9] hover:text-[#69707D]"
        >
          {/* <TrashIcon className="w-5 h-5" /> */}
        </button>
      </div>
    );
  };