import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "@/store/cartSlice";
import { CiTrash } from "react-icons/ci";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { MdClear } from "react-icons/md";
import useCurrency from "@/hook/useCurrency";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function CartPage() {

  const { symbol } = useCurrency();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Example: Your real cart logic should check if cartItems.length === 0
  // const cartItems = [];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center text-white px-4">
        <Image
          src="https://static.driffle.com/media-gallery/production/860122fd-2d7e-4b18-92fe-34be7898f5e0_empty-cartpng"
          alt="Empty Cart"
          width={200}
          height={200}
          className="mb-8"
        />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-400 mb-6">
          Go ahead and add some cool stuff to it.
        </p>
        <Link href="/">
          <button className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white">
            <FaHome className="h-5 w-5" />
            Go to store
          </button>
        </Link>
      </div>
    );
  }

  // If cart has items: Render cart items instead
  return (
    // <div className="p-4">
    //   <h1>Your Cart</h1>
    //   {cartItems.length === 0 && <p>Cart is empty</p>}
    //   {cartItems.map(item => (
    //     <div key={item.id}>
    //       <Image
    //         src={item.image}
    //         alt={item.title}
    //         width={100}
    //         height={100}
    //         className="rounded-md mb-2"/>
    //       <h2>{item.title}</h2>
    //       <p>Qty: {item.quantity}</p>
    //       <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    //     </div>
    //   ))}
    //   {cartItems.length > 0 && (
    //     <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    //   )}
    // </div>

    // <div className="min-h-screen text-white p-6">
    //   <h1 className="text-2xl font-bold mb-6">My Cart</h1>

    //   <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
    //     {/* Cart Items */}
    //     <div className="flex-1 space-y-6">
    //       {cartItems.length === 0 && <p>Your cart is empty.</p>}

    //       {cartItems.map((item) => (
    //         <div key={item.id} className="flex items-center gap-4 bg-neutral-900 p-4 rounded-lg">
    //           <Image
    //             src={item.image}
    //             alt={item.title}
    //             width={200}
    //             height={500}
    //             className="w-28 h-28 object-center rounded"
    //           />
    //           <div className="flex-1">
    //             <h2 className="text-lg font-semibold">{item.title}</h2>
    //             <div className="flex items-center gap-2 mt-2">
    //               <button onClick={() => dispatch(decreaseQuantity(item.id))} className="bg-neutral-800 px-2 py-1 rounded">
    //                 <LuMinus className="text-2xl cursor-pointer"/>
    //               </button>
    //               <span>{item.quantity}</span>
    //               <button onClick={() => dispatch(increaseQuantity(item.id))} className="bg-neutral-800 px-2 py-1 rounded">
    //                 <LuPlus className="text-2xl cursor-pointer"/>
    //               </button>
    //             </div>
    //           </div>

    //           <div className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(2)}</div>

    //           <button onClick={() => dispatch(removeFromCart(item.id))} className="ml-4 text-red-500">
    //             <CiTrash className="text-2xl cursor-pointer"/>
    //           </button>
    //         </div>
    //       ))}
    //     </div>

    //     {/* Summary */}
    //     <div className="w-full lg:w-1/3 bg-neutral-900 p-6 rounded-lg">
    //       <h2 className="text-xl font-bold mb-4">Summary</h2>
    //       <p className="text-lg font-semibold mb-2">Your cart total</p>
    //       <p className="text-3xl font-bold mb-4">₹{total.toFixed(2)}</p>
    //       <button className="block w-full bg-blue-600 py-3 rounded-lg font-semibold text-center">
    //         Proceed to checkout →
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-[#0d0d0d] text-white min-h-screen">
      {/* Driffle Nav */}
      {/* <nav className="bg-[#1a1a1a] flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="font-extrabold text-white text-lg select-none">driffle</span>
        </div>

        <div className="flex items-center space-x-6 text-sm font-semibold select-none">
          <div className="flex items-center space-x-2">
            <div className="bg-white text-black rounded-md w-7 h-7 flex items-center justify-center font-semibold">1</div>
            <span>Cart</span>
            <span className="border-b border-gray-600 w-20"></span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="border border-gray-600 rounded-md w-7 h-7 flex items-center justify-center font-semibold">2</div>
            <span>Checkout</span>
            <span className="border-b border-gray-600 w-20"></span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="border border-gray-600 rounded-md w-7 h-7 flex items-center justify-center font-semibold">3</div>
            <span>Redeem</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs font-semibold select-none">
          <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 h-3 rounded-sm" />
          <span>INR</span>
          <span>•</span>
          <span>English</span>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="max-w-[1500px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
        {/* Left: Cart Items */}
        <section className="flex-1 max-w-7xl">
          <h2 className="font-semibold text-white text-lg mb-6">My Cart</h2>
          <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-4 text-xs text-gray-300">
            <div className="flex justify-end">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-sm text-red-500 hover:underline cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <span><CiTrash className="text-2xl"/> </span>
                  {/* <span>Clear Cart</span> */}
                </div>
              </button>
            </div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex bg-[#222222] rounded-lg p-3 gap-4 relative items-start">
                <Image src={item.image} alt={item.title} height={90} width={120} className="object-center rounded-sm flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start  gap-2">
                      <h3 className="flex-1 min-w-0 text-white font-extrabold text-[1rem] leading-tight line-clamp-2 mt-5">{item.title}</h3>
                      {item.item_type_gift && (<span className="bg-[#ff7f6a] px-2.5 py-1 rounded font-medium text-white mr-5 mt-5">{item.item_type_gift}</span>)}
                      {item.item_type_game && (<span className="bg-[#5539cc] px-2.5 py-1 rounded font-medium text-white mr-5 mt-5">{item.item_type_game}</span>)}
                      {/* {item.tag_type && (<span className="bg-[#2a2a2a] px-2.5 py-1 rounded font-medium text-white mr-5 mt-5">{item.tag_type}</span>)} */}
                    </div>
                    {/* <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#6a6aff] uppercase">GAME</span>
                      </div> */}
                    <span className="text-[#0099ff] text-sm font-extrabold uppercase mt-2.5 inline-block">{item.region}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="cursor-pointer"><CiTrash className="text-2xl text-white" /></button>
                    <button onClick={() => dispatch(decreaseQuantity(item.id))} className="cursor-pointer bg-[#1a1a1a] text-white outline-none rounded w-[24px] h-[24px] flex items-center justify-center"><LuMinus className="text-white" /></button>
                    <span className="bg-[#1a1a1a] outline-none text-white rounded w-[24px] h-[24px] flex items-center justify-center">{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))} className="cursor-pointer bg-[#1a1a1a] text-white outline-none rounded w-[24px] h-[24px] flex items-center justify-center"><LuPlus className="text-white" /></button>
                  </div>
                </div>
                {/* <div className="flex items-end"> */}
                <div className="absolute bottom-5 md:bottom-8 left-38 text-white font-semibold text-lg whitespace-nowrap">
                  {/* {symbol} {item.price * item.quantity} */}
                  {symbol} {(item.price * item.quantity).toFixed(2)}
                  {/* </div> */}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Summary */}
        <section className="w-full lg:max-w-sm flex flex-col gap-6">
          <h2 className="font-semibold text-white text-lg">Summary</h2>
          <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-3 text-xs text-gray-300">
            <div className="flex items-center gap-1 text-[#6a6aff] font-semibold uppercase text-[9px]">
              <span>plus</span>
              <span className="bg-[#6a6aff] text-white rounded px-1 text-[11px] font-bold tracking-widest">MEMBERSHIP</span>
              <span>Save extra ₹107.71</span>
            </div>
            <div>
              <p className="text-gray-300 text-xs font-semibold mb-1">Your cart total</p>
              <p className="text-white font-extrabold text-2xl mb-1">~ {symbol}{total}</p>
              <p className="text-gray-500 text-[12px] flex items-center gap-1">PRICE NOT FINAL <IoInformationCircleOutline className="text-lg text-white"/></p>
            </div>
            <Link href="/checkout">
              <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] rounded-md py-3 text-white font-semibold flex items-center justify-center gap-2">
                Proceed to checkout
              </button>
            </Link>
          </div>
          <div className="border border-[#6a6aff] rounded-lg p-4 space-y-3 text-xs text-gray-300 relative">
            <div className="flex items-center gap-1 font-semibold text-white">
              Save extra <span className="text-[#6a6aff]">₹107.71</span> , Join Driffle <span className="text-[#6a6aff]">plus</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><i className="fas fa-check-circle text-[#6a6aff] mt-[3px]"></i> Up to 10% OFF</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-[#6a6aff]"></i> Exclusive events<label className="ml-auto relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#6a6aff]"></div><div className="absolute left-[4px] top-[4px] bg-white w-5 h-5 rounded-full peer-checked:translate-x-5 transition-transform"></div></label></li>
              <li className="flex items-start gap-2"><i className="fas fa-check-circle text-[#6a6aff] mt-[3px]"></i> Priority pre-order</li>
              <li className="flex items-start gap-2"><i className="fas fa-check-circle text-[#6a6aff] mt-[3px]"></i> Priority support</li>
            </ul>
            <div className="absolute top-0 right-0 text-[100px] font-extrabold text-[#6a6aff] opacity-10 select-none pointer-events-none" style={{ lineHeight: 0.7 }}>+</div>
          </div>
          <p className="text-gray-400 text-xs text-center">See our <span className="font-semibold">3,880</span> reviews on <span className="text-[#00c853] font-semibold flex items-center justify-center gap-1 inline-block"><i className="fas fa-star"></i> Trustpilot</span></p>
        </section>
      </main>
    </div>
  );
}
