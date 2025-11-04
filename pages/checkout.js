// // pages/checkout.jsx (or /Checkout.jsx if using file routing)

// import React from "react";

// export default function Checkout() {
//   return (
//     <main className="max-w-[1500px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10 text-white">
//       {/* Left: Checkout Form */}
//       <section className="flex-1 max-w-4xl">
//         <h2 className="font-semibold text-white text-lg mb-6 select-none">
//           Checkout
//         </h2>

//         <form className="bg-[#1a1a1a] rounded-lg p-6 space-y-6">
//           {/* Billing Details */}
//           <div>
//             <label className="block mb-2 text-sm font-semibold">Full Name</label>
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full px-4 py-2 rounded bg-[#222] text-white border border-gray-600"
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-semibold">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 rounded bg-[#222] text-white border border-gray-600"
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-semibold">Address</label>
//             <input
//               type="text"
//               placeholder="Street, City, ZIP"
//               className="w-full px-4 py-2 rounded bg-[#222] text-white border border-gray-600"
//             />
//           </div>

//           {/* Payment Method */}
//           <div>
//             <label className="block mb-2 text-sm font-semibold">Payment Method</label>
//             <select className="w-full px-4 py-2 rounded bg-[#222] text-white border border-gray-600">
//               <option>Credit/Debit Card</option>
//               <option>PayPal</option>
//               <option>UPI</option>
//             </select>
//           </div>

//           {/* Place Order Button */}
//           <button
//             type="submit"
//             className="w-full bg-[#3b82f6] hover:bg-[#2563eb] rounded-md py-3 text-white font-semibold"
//           >
//             Place Order
//           </button>
//         </form>
//       </section>

//       {/* Right: Order Summary */}
//       <section className="w-full lg:max-w-sm flex flex-col gap-6">
//         <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-3 text-xs text-gray-300">
//           <h3 className="font-semibold text-white text-lg mb-4 select-none">
//             Order Summary
//           </h3>

//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>₹1,299</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Taxes</span>
//             <span>₹50</span>
//           </div>
//           <div className="flex justify-between font-bold text-white">
//             <span>Total</span>
//             <span>₹1,349</span>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }



// import { useState } from "react";

// export default function CheckoutPage() {
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async (gateway) => {
//     setLoading(true);

//     const res = await fetch("/api/create-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         items: [
//           { name: "Awesome Game", price: 499, quantity: 1 },
//           // your cart items here
//         ],
//         user: { id: 1 }, // your logged-in user ID
//         gateway,
//       }),
//     });

//     const data = await res.json();
//     window.location.href = data.paymentUrl;
//   };

//   return (
//     <main className="p-10">
//       <h1 className="text-2xl mb-4">Checkout</h1>
//       <button
//         onClick={() => handleCheckout("stripe")}
//         className="px-4 py-2 bg-blue-600 text-white rounded mr-4"
//       >
//         Pay with Stripe
//       </button>
//       <button
//         onClick={() => handleCheckout("cashfree")}
//         className="px-4 py-2 bg-green-600 text-white rounded"
//       >
//         Pay with Cashfree
//       </button>
//     </main>
//   );
// }







// pages/checkout.js
'use client'
import EmailStep from "@/components/Checkout/EmailStep";
import PaymentMethods from "@/components/Checkout/PaymentMethods";
import OrderSummary from "@/components/Checkout/OrderSummary";
import { useSelector,useDispatch } from "react-redux";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "@/store/cartSlice";

export default function Checkout() {

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


  return (
    <main className="min-h-screen text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <EmailStep />
          <PaymentMethods />
        </div>
        <OrderSummary
          cartItems={cartItems}
          onRemove={id => dispatch(removeFromCart(id))}
          onIncrease={id => dispatch(increaseQuantity(id))}
          onDecrease={id => dispatch(decreaseQuantity(id))}
        />
      </div>
    </main>
  );
}
