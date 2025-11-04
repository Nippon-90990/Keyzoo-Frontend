// components/Checkout/PaymentMethods.js
// export default function PaymentMethods() {
//   return (
//     <div className="bg-[#1a1a1a] p-6 rounded-lg space-y-4">
//       <h3 className="text-sm text-gray-400">Step 2</h3>
//       <h2 className="text-lg font-bold">Choose a payment method</h2>

//       <div className="space-y-4">
//         {/* Wallet */}
//         <div className="flex items-center justify-between bg-[#222] p-4 rounded">
//           <div className="flex items-center gap-2">
//             <input type="radio" name="payment" />
//             <span>Driffle Wallet</span>
//           </div>
//           <button className="text-[#6a6aff] text-sm">Login</button>
//         </div>

//         {/* VISA/MC */}
//         <div className="bg-[#222] p-4 rounded space-y-3">
//           <div className="flex items-center gap-2">
//             <input type="radio" name="payment" defaultChecked />
//             <span>VISA Mastercard</span>
//           </div>
//           <input type="text" placeholder="Card number" className="w-full p-3 rounded bg-[#333] outline-none" />
//           <input type="text" placeholder="Cardholder name" className="w-full p-3 rounded bg-[#333] outline-none" />
//           <div className="flex gap-2">
//             <input type="text" placeholder="MM/YY" className="w-1/2 p-3 rounded bg-[#333] outline-none" />
//             <input type="text" placeholder="CVC" className="w-1/2 p-3 rounded bg-[#333] outline-none" />
//           </div>
//           <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] py-3 rounded text-white font-semibold">
//             Pay with Card
//           </button>
//         </div>

//         {/* Add other methods like UPI, AMEX, Google Pay, Crypto */}
//         {/* Repeat similar style */}
//       </div>
//     </div>
//   );
// }



//PaymentMethods.js

"use client";

import { useState } from "react";
import Image from "next/image";

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState('UPI');

  const paymentMethods = [
    {
      name: "UPI",
      logo: "/payments_payicon/upi.svg", // replace with your actual image path
    },
    {
      name: "Debit / Credit Card",
      logo: "/payments_payicon/visa.svg", // replace with your actual image path
    },
    {
      name: "AMEX",
      logo: "/payments_payicon/amex.svg", // replace with your actual image path
    },
    {
      name: "Google Pay",
      logo: "/payments_payicon/gpay.svg", // optional
    },
    {
      name: "Crypto",
      logo: "/payments_payicon/crypto.svg", // optional
    },
  ];

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <label
          key={method.name}
          className={`flex items-center justify-between bg-[#1a1a1a] px-4 py-3 rounded-lg cursor-pointer transition ${
            selectedMethod === method.name ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedMethod === method.name}
              onChange={() => setSelectedMethod(method.name)}
              className="form-radio accent-blue-500 w-5 h-5"
            />
            <Image
              src={method.logo}
              alt={method.name}
              width={80}
              // fill
              height={50}
              className="object-contain bg-white rounded w-[80px] h-[40px]"
            />
          </div>
          <span className="text-[0.875rem] text-gray-300">{method.name}</span>
        </label>
      ))}
    </div>
  );
}
