// // components/Footer.js
// 'use client';
// import React from 'react';
// import Image from "next/image";
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-[#1e1e1e] text-white text-sm">
//       {/* Step 1: Payment Methods */}
//       <div className="border-b border-neutral-800 py-4 px-4 flex flex-wrap items-center gap-4">
//         <span className="text-gray-300">Pay via</span>

//         {/* Replace with your own logos if needed */}
//         <Image src="/payments/upi.svg" alt="UPI" width={40} height={20} />
//         <Image src="/payments/applepay.svg" alt="Apple Pay" width={40} height={20} />
//         <Image src="/payments/visa.svg" alt="Visa" width={40} height={20} />
//         <Image src="/payments/mastercard.svg" alt="MasterCard" width={40} height={20} />
//         <Image src="/payments/amex.svg" alt="American Express" width={40} height={20} />

//         <span className="text-gray-400">and more</span>
//       </div>

//       {/* // components/Footer.js (continued) */}

//       <div className="px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-8 text-gray-300">
//         {/* Trustpilot + Language */}
//         <div className="space-y-4">
//           <div>
//             <Image src="/icons/trust.svg" alt="Trustpilot" width={120} height={40} />
//             <p className="text-sm mt-2">
//               TrustScore <span className="font-bold text-white">4.1</span> |{" "}
//               <span className="font-bold text-white">3,826</span> reviews
//             </p>
//           </div>

//           {/* Language Switcher */}
//           <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-md w-max">
//             <Image src="/icons/india.svg" alt="India Flag" width={20} height={14} />
//             <span>INR • English</span>
//           </div>
//         </div>

//         {/* Column: Company */}
//         <div className="space-y-2">
//           <h4 className="text-white font-semibold text-xl mb-2">Company</h4>
//           <p>About</p>
//           <p>Contact Us</p>
//         </div>

//         {/* Column: Buy */}
//         <div className="space-y-2">
//           <h4 className="text-white font-semibold text-xl mb-2">Buy</h4>
//           <p>Collections</p>
//           <p>Product List</p>
//         </div>

//         {/* Column: Help */}
//         <div className="space-y-2">
//           <h4 className="text-white font-semibold text-xl mb-2">Help</h4>
//           <p>Activation Guides</p>
//           <p>Create a Ticket</p>
//         </div>


//         {/* Column: Social + Business */}
//         <div className="space-y-2">
//           <h4 className="text-white mb-2 font-semibold text-xl">Follow Us</h4> {/* Do not change */}
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center gap-2">
//               <FaFacebookF className='text-2xl'/>
//               <p>Facebook</p>
//             </div>
//             <div className="flex items-center gap-2">
//               {/* <Image src="/icons/instagram.svg" alt="Instagram" width={20} height={20} /> */}
//               <FaInstagram className='text-2xl' />
//               <p>Instagram</p>
//             </div>
//             <div className="flex items-center gap-2">
//               {/* <Image src="/icons/twitter.svg" alt="Twitter" width={20} height={20} /> */}
//               <FaTwitter className='text-2xl' />
//               <p>Twitter</p>
//             </div>
//             <div className="flex items-center gap-2">
//               {/* <Image src="/icons/youtube.svg" alt="YouTube" width={20} height={20} /> */}
//               <FaYoutube className='text-2xl' />
//               <p>YouTube</p>
//             </div>
//             <div className="flex items-center gap-2">
//               {/* <Image src="/icons/discord.svg" alt="Discord" width={20} height={20} /> */}
//               <FaDiscord className='text-2xl' />
//               <p>Discord</p>
//             </div>
//           </div>
//         </div>
//       </div>

//     </footer>
//   );
// }

// // components/Footer.js
// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaDiscord } from 'react-icons/fa';

// export default function Footer() {
//   return (
//     <footer className="bg-[#1e1e1e] text-white text-sm">
//       {/* Payment Methods */}
//       <div className="border-b border-neutral-800 py-4 px-4 flex flex-wrap items-center gap-4">
//         <span className="text-gray-300">Pay via</span>
//         <Image src="/payments/upi.svg" alt="UPI" width={40} height={20} />
//         <Image src="/payments/applepay.svg" alt="Apple Pay" width={40} height={20} />
//         <Image src="/payments/visa.svg" alt="Visa" width={40} height={20} />
//         <Image src="/payments/mastercard.svg" alt="MasterCard" width={40} height={20} />
//         <Image src="/payments/amex.svg" alt="Amex" width={40} height={20} />
//         <span className="text-gray-400">and more</span>
//       </div>

//       {/* Main Footer */}
//       <div className="px-4 py-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-10 text-gray-300">
//         {/* Column 1: Trustpilot + Language */}
//         <div className="space-y-6">
//           {/* <div>
//             <Image src="/icons/trust.svg" alt="Trustpilot" width={120} height={40} />
//             <p className="text-sm mt-2">
//               TrustScore <span className="font-bold text-white">4.1</span> |{" "}
//               <span className="font-bold text-white">3,826</span> reviews
//             </p>
//           </div> */}

//           <div>
//             {/* Trustpilot logo */}
//             <Image src="/icons/trust.svg" alt="Trustpilot" width={120} height={40} />

//             {/* Stars SVG below logo */}
//             <div className="mt-2">
//               <Image src="/icons/star.svg" alt="Trustpilot Stars" width={100} height={20} />
//             </div>

//             {/* Review Text */}
//             <p className="text-sm mt-1">
//               TrustScore <span className="font-bold text-white">4.1</span> |{" "}
//               <span className="font-bold text-white">3,826</span> reviews
//             </p>
//           </div>


//           <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-md w-max">
//             <Image src="/icons/india.svg" alt="India Flag" width={20} height={14} />
//             <span>INR • English</span>
//           </div>
//         </div>

//         {/* Column 2: Company */}
//         <div className="space-y-2">
//           <h4 className="text-white font-semibold text-xl mb-2">Company</h4>
//           <p>About</p>
//           <p>Contact Us</p>
//         </div>

//         {/* Column 3: Buy */}
//         <div className="space-y-2">
//           <h4 className="text-white font-semibold text-xl mb-2">Buy</h4>
//           <p>Collections</p>
//           <p>Product List</p>
//         </div>

//         {/* Column 4: Help */}
//         <div className="space-y-2">
//           <h4 className="text-white font-semibold text-xl mb-2">Help</h4>
//           <p>Activation Guides</p>
//           <p>Create a Ticket</p>
//         </div>

//         {/* Column 5: Community + Business */}
//         <div className="space-y-2">
//           <h4 className="text-white font-semibold text-xl mb-2">Community</h4>
//           <p>Blog</p>
//           <p>Become an Affiliate</p>
//           <h4 className="text-white font-semibold text-xl mt-4 mb-2">Business</h4>
//           <p>Sell on Driffle</p>
//         </div>

//         {/* Column 6: Social Links */}
//         <div className="space-y-2">
//           <h4 className="text-white font-semibold text-xl mb-2">Follow Us</h4>
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center gap-3">
//               <FaFacebookF className="text-2xl" />
//               <span>Facebook</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FaInstagram className="text-2xl" />
//               <span>Instagram</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FaTwitter className="text-2xl" />
//               <span>Twitter</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FaYoutube className="text-2xl" />
//               <span>YouTube</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FaDiscord className="text-2xl" />
//               <span>Discord</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



// components/Footer.js
// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaDiscord } from 'react-icons/fa';
// import { useTheme } from 'next-themes';
// import { FaSun, FaMoon } from 'react-icons/fa';
// import ThemeToggle from './ThemeToggle';

// export default function Footer() {
//   return (
//     <footer className="w-full bg-[#1e1e1e] text-white text-sm">
//       {/* Payment Methods */}
//       <div className="border-b border-neutral-800 py-4 px-4 flex flex-wrap items-center gap-4">
//         <span className="text-gray-300">Pay via</span>
//         <Image src="/payments/upi.svg" alt="UPI" width={40} height={20} />
//         <Image src="/payments/applepay.svg" alt="Apple Pay" width={40} height={20} />
//         <Image src="/payments/visa.svg" alt="Visa" width={40} height={20} />
//         <Image src="/payments/mastercard.svg" alt="MasterCard" width={40} height={20} />
//         <Image src="/payments/amex.svg" alt="Amex" width={40} height={20} />
//         <span className="text-gray-400">and more</span>
//       </div>

//       {/* Main Footer */}
//       <div className="px-4 py-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-12 text-gray-300">
//         {/* Column 1: Trustpilot + Language */}
//         <div className="space-y-6">
//           <div>
//             {/* Trustpilot logo */}
//             <Image src="/icons/trust.svg" alt="Trustpilot" width={120} height={40} />

//             {/* Stars SVG below logo */}
//             <div className="mt-3">
//               <Image src="/icons/star.svg" alt="Trustpilot Stars" width={100} height={20} />
//             </div>

//             {/* Review Text */}
//             <p className="text-sm mt-2">
//               TrustScore <span className="font-bold text-white">4.1</span> |{" "}
//               <span className="font-bold text-white">3,826</span> reviews
//             </p>
//           </div>

//           {/* Language Switcher */}
//           <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-md w-max">
//             <Image src="/icons/india.svg" alt="India Flag" width={20} height={14} />
//             <span>INR • English</span>
//           <ThemeToggle />
//           </div>
//         </div>

//         {/* Column 2: Company */}
//         <div className="space-y-3">
//           <h4 className="text-white font-semibold text-xl mb-3">Company</h4>
//           <p>About</p>
//           <p>Contact Us</p>
//         </div>

//         {/* Column 3: Buy */}
//         <div className="space-y-3">
//           <h4 className="text-white font-semibold text-xl mb-3">Buy</h4>
//           <p>Collections</p>
//           <p>Product List</p>
//         </div>

//         {/* Column 4: Help */}
//         <div className="space-y-3">
//           <h4 className="text-white font-semibold text-xl mb-3">Help</h4>
//           <p>Activation Guides</p>
//           <p>Create a Ticket</p>
//         </div>

//         {/* Column 5: Community + Business */}
//         <div className="space-y-3">
//           <h4 className="text-white font-semibold text-xl mb-3">Community</h4>
//           <p>Blog</p>
//           <p>Become an Affiliate</p>

//           <h4 className="text-white font-semibold text-xl mt-5 mb-3">Business</h4>
//           <p>Sell on Driffle</p>
//         </div>

//         {/* Column 6: Follow Us */}
//         <div className="space-y-3">
//           <h4 className="text-white font-semibold text-xl mb-3">Follow Us</h4>
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center gap-3">
//               <FaFacebookF className="text-2xl" />
//               <span>Facebook</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FaInstagram className="text-2xl" />
//               <span>Instagram</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FaTwitter className="text-2xl" />
//               <span>Twitter</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FaYoutube className="text-2xl" />
//               <span>YouTube</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <FaDiscord className="text-2xl" />
//               <span>Discord</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Company Address Grid */}
//       <div className="border-t border-neutral-800 px-4 pt-8 pb-12 text-gray-400 text-sm max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div>
//             <p className="font-semibold text-white mb-1">Driffle UAB (Platform operator)</p>
//             <p>Naugarduko g. 3-401, 03231, Lithuania.</p>
//           </div>
//           <div>
//             <p className="font-semibold text-white mb-1">Driffle Inc (Platform operator)</p>
//             <p>3524 Silverside Road Wilmington, Delaware, 19810 United States of America.</p>
//           </div>
//           <div>
//             <p className="font-semibold text-white mb-1">Bundle Limited (Platform operator)</p>
//             <p>Unit 2A, 17/F, Glenealy Tower, No. 1 Glenealy Central Hong Kong</p>
//           </div>
//           <div>
//             <p className="font-semibold text-white mb-1">Remittx Private Limited (Platform operator)</p>
//             <p>1st Floor, Gopala Krishna Complex, Residency Road Bengaluru, Karnataka, 560025 India</p>
//           </div>
//         </div>
//       </div>

//       {/* Legal Bottom Bar */}
//       <div className="border-t border-neutral-800 px-4 py-6 text-gray-500 text-sm">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
//           <p>© 2025 Driffle. All rights reserved.</p>
//           <div className="flex gap-4">
//             <a href="#" className="hover:text-white transition">Terms & Conditions</a>
//             <a href="#" className="hover:text-white transition">Privacy Policy</a>
//             <a href="#" className="hover:text-white transition">Imprint</a>
//           </div>
//         </div>
//       </div>

//     </footer>
//   );
// }

// components/Footer.js
'use client';
import { React, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaDiscord } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Footer() {

  const [showAddresses, setShowAddresses] = useState(false);

  // Option 1: Show based on environment variable
  useEffect(() => {
    // You can set this in your environment variables
    setShowAddresses(process.env.NEXT_PUBLIC_SHOW_ADDRESSES === 'true');
  }, []);

  return (
    <footer className="w-full bg-[#1e1e1e] text-white text-sm">
      {/* Payment Methods */}
      <div className="border-b border-neutral-800 py-4 px-4 flex flex-wrap items-center gap-4 text-center justify-center sm:justify-start">
        <span className="text-gray-300">Pay via</span>
        <Image src="/payments_footer/upi.svg" alt="UPI" width={40} height={20} />
        <Image src="/payments_footer/applepay.svg" alt="Apple Pay" width={40} height={20} />
        <Image src="/payments_footer/visa.svg" alt="Visa" width={40} height={20} />
        <Image src="/payments_footer/mastercard.svg" alt="MasterCard" width={40} height={20} />
        <Image src="/payments_footer/amex.svg" alt="Amex" width={40} height={20} />
        <span className="text-gray-400">and more</span>
      </div>

      {/* Main Footer */}
      <div className="px-4 py-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-12 text-gray-300 text-center md:text-left">
        {/* Column 1: Trustpilot + Language */}
        <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
          <div>
            {/* Trustpilot logo */}
            <Image src="/icons/trust.svg" alt="Trustpilot" width={120} height={40} />

            {/* Stars SVG below logo */}
            <div className="mt-3">
              <Image src="/icons/star.svg" alt="Trustpilot Stars" width={100} height={20} />
            </div>

            {/* Review Text */}
            <p className="text-sm mt-2">
              TrustScore <span className="font-bold text-white">4.1</span> |{" "}
              <span className="font-bold text-white">3,826</span> reviews
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-md w-max">
            <Image src="/icons/india.svg" alt="India Flag" width={20} height={14} />
            <span>INR • English</span>
            <ThemeToggle />
          </div>
        </div>

        {/* Column 2: Company */}
        <div className="space-y-3 items-center md:items-start flex flex-col">
          <h4 className="text-white font-semibold text-xl mb-3">Company</h4>
          <p className='cursor-pointer text-[gray] hover:text-white'>About</p>
          <Link href={'/contact-us'}><p className='cursor-pointer text-[gray] hover:text-white'>Contact Us</p></Link>
        </div>

        {/* Column 3: Buy */}
        <div className="space-y-3 items-center md:items-start flex flex-col">
          <h4 className="text-white font-semibold text-xl mb-3">Buy</h4>
          <p className='cursor-pointer text-[gray] hover:text-white'>Collections</p>
          <p className='cursor-pointer text-[gray] hover:text-white'>Product List</p>
        </div>

        {/* Column 4: Help */}
        <div className="space-y-3 items-center md:items-start flex flex-col">
          <h4 className="text-white font-semibold text-xl mb-3">Help</h4>
          <p className='cursor-pointer text-[gray] hover:text-white'>Activation Guides</p>
          <Link href={'/contact-us'}><p className='cursor-pointer text-[gray] hover:text-white'>Contact Us</p></Link>
        </div>

        {/* Column 5: Community + Business */}
        <div className="space-y-3 items-center md:items-start flex flex-col">
          <h4 className="text-white font-semibold text-xl mb-3">Community</h4>
          <p className='cursor-pointer text-[gray] hover:text-white'>Blog</p>
          <p className='cursor-pointer text-[gray] hover:text-white'>Become an Affiliate</p>

          <h4 className="text-white font-semibold text-xl mt-5 mb-3">Business</h4>
          <p className='cursor-pointer text-[gray] hover:text-white'>Sell on Driffle</p>
          <p className='cursor-pointer text-[gray] hover:text-white'>Wholesale</p>
        </div>

        {/* Column 6: Follow Us */}
        <div className="space-y-3 items-center md:items-start flex flex-col">
          <h4 className="text-white font-semibold text-xl mb-3">Follow Us</h4>
          <div className="text-[grey] flex flex-wrap justify-center gap-4 md:flex-col md:items-start">
            <div className="flex items-center gap-3 cursor-pointer hover:text-[white]">
              <FaFacebookF className="text-2xl" />
              <span className="hidden md:inline">Facebook</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-[white]">
              <FaInstagram className="text-2xl" />
              <span className="hidden md:inline">Instagram</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-[white]">
              <FaTwitter className="text-2xl" />
              <span className="hidden md:inline">Twitter</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-[white]">
              <FaYoutube className="text-2xl" />
              <span className="hidden md:inline">YouTube</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-[white]">
              <FaDiscord className="text-2xl" />
              <span className="hidden md:inline">Discord</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Address Grid */}
      {showAddresses &&(<div className="border-t border-neutral-800 px-4 pt-8 pb-12 text-gray-400 text-sm max-w-7xl mx-auto text-justify tracking-tight">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="font-semibold text-white mb-1">Driffle UAB (Platform operator)</p>
            <p>Naugarduko g. 3-401, 03231, Lithuania.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">Driffle Inc (Platform operator)</p>
            <p>3524 Silverside Road Wilmington, Delaware, 19810 United States of America.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">Bundle Limited (Platform operator)</p>
            <p>Unit 2A, 17/F, Glenealy Tower, No. 1 Glenealy Central Hong Kong</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">Remittx Private Limited (Platform operator)</p>
            <p>1st Floor, Gopala Krishna Complex, Residency Road Bengaluru, Karnataka, 560025 India</p>
          </div>
        </div>
      </div>)}

      {/* Legal Bottom Bar */}
      <div className="border-t border-neutral-800 px-4 py-6 text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Driffle. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Imprint</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
