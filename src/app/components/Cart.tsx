import { useCart } from "../context/product";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }


function Cart() {
    const { cartItems, totalItems, totalPrice, clearCart, showCart } = useCart();
  
    if (!showCart) return null;
  
    return (
      <div className="bg-[#FFFFFF] w-[360px] h-[256px] shadow-lg absolute rounded-lg right-[-4rem] top-[5rem] lg:top-[3rem] lg:left-[-9rem] z-50">
        <div className="flex flex-col h-full">
          <p className="border-b p-4 opacity-30 text-[#1D2026] font-bold">Cart</p>
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