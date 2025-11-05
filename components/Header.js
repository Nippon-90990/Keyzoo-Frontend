// 'use client'; // if you're using App Router
// import Link from 'next/link';
// import { useState } from 'react';
// import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
// import { useRouter } from 'next/router';
// import { Heart, ShoppingCart } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { selectCartCount } from '@/store/slices/cartSlice';
// import { selectWishlistCount } from '@/store/slices/wishlistSlice';

// export default function Header() {

//     const cartCount = useSelector(selectCartCount) || 0;
//     const wishlistCount = useSelector(selectWishlistCount) || 0;
//     const [search, setSearch] = useState('');
//     const router = useRouter();

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (search.trim()) {
//         router.push(`/search?q=${search}`);
//         }
//     };

//     return (
//         <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold text-black">
//             🎮 GameStore
//         </Link>

//         {/* Search bar */}
//         <form onSubmit={handleSearch} className="flex-1 mx-4 max-w-lg">
//             <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search games..."
//             className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//         </form>

//         {/* Icons */}
//         <div className="flex items-center space-x-4">
//             {/* Wishlist */}
//             <Link href="/wishlist" className="relative group">
//             <Heart className="w-6 h-6 text-gray-700 group-hover:text-black" />
//             {wishlistCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {wishlistCount}
//                 </span>
//             )}
//             </Link>

//             {/* Cart */}
//             <Link href="/cart" className="relative group">
//             <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-black" />
//             {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {cartCount}
//                 </span>
//             )}
//             </Link>

//             {/* Clerk auth */}
//             <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//             </SignedIn>
//             <SignedOut>
//             <SignInButton mode="modal" />
//             </SignedOut>
//         </div>
//         </header>
//     );
// }




// import { Search, Menu, ShoppingCart } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function Header() {
//   return (
//     <header className="w-full shadow-sm border-b border-neutral-800 sticky top-0 z-50">
//         {/* Top Header */}
//         <div className="bg-[#1e1e1e] text-white px-4 py-5 flex items-center justify-between min-h-[72px]">
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//                 <Link href="/" className="flex items-center gap-1">
//                 <Image src="/logo.png" alt="Logo" width={50} height={32} className="w-auto" />
//                     <span className="font-bold text-xl">driffle</span>
//                 </Link>
//             </div>

//             {/* Search Bar */}
//             <div className="flex-grow max-w-2xl md:max-w-3xl lg:max-w-4xl">
//             <div className="relative">
//                 <input
//                 type="text"
//                 placeholder="Search for games, gift cards and more"
//                 className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none"
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
//             </div>
//             </div>

//             {/* Right Controls */}
//             <div className="flex items-center justify-between gap-4">
//                 {/* <div className="text-xs font-medium whitespace-nowrap">
//                     🇮🇳 INR • English
//                 </div> */}

//                 <Link href="/cart">
//                     <div className="p-3 rounded-md hover:bg-gray-800 transition duration-200">
//                         <ShoppingCart className="h-6 w-6" />
//                     </div>    
//                 </Link>

//                 <button className="cursor-pointer h-[48px] w-[120px] bg-gray-700 hover:bg-gray-600 text-white transition px-4 py-1 rounded-md">Login</button>
//                 <button className="cursor-pointer h-[48px] w-[120px] bg-blue-500 hover:bg-blue-400 transition px-4 py-1 rounded-md text-white">Sign up</button>
//             </div>
//       </div>

//         {/* Bottom Menu */}
//         <nav className="bg-neutral-900 text-white px-4 py-2 flex items-center gap-6 text-sm font-medium">
//             <button className="flex items-center gap-1">
//             <Menu className="h-4 w-4" />
//             Categories
//             </button>
//             <Link href="#">Store</Link>
//             <Link href="#">Upcoming</Link>
//             <Link href="#">Topups</Link>
//             <Link href="#">Save with <span className="text-purple-400 font-bold">plus</span></Link>
//             <Link href="#">Explore eSIMs</Link>
//         </nav>
//     </header>
//   );
// }









// import { Search, Menu, ShoppingCart } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import UserMenu from "./UserMenu";
// import LiveSearch from "./LiveSearch";
// import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
// import { useAuth } from "@/context/AuthContext";

// export default function Header() {

//     const { user } = useAuth();

//     // useEffect(() => {
//     //     // Fetch user info from localStorage
//     //     const storedUser = localStorage.getItem("user");
//     //     if (storedUser) {
//     //         setUser(JSON.parse(storedUser));
//     //     }
//     // }, []);

//     return (
//         <header className="w-screen shadow-sm border-b border-neutral-800 sticky top-0 z-50 bg-[#1e1e1e]">
//             {/* Top Header */}
//             {/* <div className="px-4 py-3 flex flex-wrap items-center justify-between min-h-[72px] gap-y-4 lg:flex-nowrap"> */}
//             <div className="px-4 py-3 flex items-center justify-between min-h-[72px] gap-2 flex-wrap md:flex-nowrap">

//                 {/* Logo */}
//                 <div className="flex items-center gap-2 min-w-[120px]">
//                     <Link href="/" className="flex items-center gap-1">
//                         <Image
//                             src="http://localhost:1337/uploads/Untitled_design_14_1_1_30fe7c121e.png"
//                             alt="Logo"
//                             width={32}
//                             height={32}
//                             className="w-auto"
//                         />
//                         <span className="font-bold text-lg text-white">Driffle Keys</span>
//                     </Link>
//                 </div>

//                 {/* Search Bar */}
//                 {/* <div className="w-full md:flex-1 min-w-0 order-3 md:order-none"> */}
//                 <div className="flex-1 min-w-0">
//                     <div className="relative max-w-full md:max-w-3xl mx-auto">
//                         <LiveSearch
//                             type="text"
//                             placeholder="Search for games, gift cards and more"
//                             className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none"
//                         />
//                         <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
//                     </div>
//                 </div>

//                 {/* Right Controls */}
//                 <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
//                     <Link href="/cart">
//                         <div className="p-3 rounded-md hover:bg-neutral-800 transition duration-200">
//                             {/* <ShoppingCart className="h-6 w-6 text-white" /> */}
//                             <FaShoppingCart className="text-2xl" />
//                         </div>
//                     </Link>

//                     {/* User Menu or Sign In */}
//                     {user ? (
//                         <UserMenu user={user} />
//                     ) : (
//                         <Link href="/sign-in">
//                             <div className="p-3 rounded-md hover:bg-neutral-800 transition duration-200">
//                                 <FaUserCircle className="text-2xl" />
//                             </div>
//                         </Link>
//                     )}


//                     {/* <button className="h-[40px] px-4 bg-gray-700 hover:bg-gray-600 text-sm text-white rounded-md">
//                             <Link href="/sign-in">Login</Link>
//                         </button> 
//                     */}


//                     {/* <button className="mr-5 h-[40px] px-4 bg-blue-500 hover:bg-blue-400 text-sm text-white rounded-md">
//                             <Link href="/sign-up">Sign up</Link>
//                         </button> 
//                     */}



//                     {/* <SignedIn>
//                         <UserMenu />
//                         {/* <UserButton afterSignOutUrl="/" /> */}
//                     {/* </SignedIn> */}
//                 </div>
//             </div>


//             {/* Bottom Navigation */}
//             <nav className="bg-neutral-900 text-white px-4 py-2 flex items-center gap-4 sm:gap-5 md:gap-6 text-sm font-medium overflow-x-auto">
//                 <button className="flex items-center gap-1">
//                     <Menu className="h-4 w-4" />
//                     <span className="whitespace-nowrap">Categories</span>
//                 </button>
//                 <Link href="/store" className="whitespace-nowrap">
//                     Store
//                 </Link>
//                 <Link href="/upcoming" className="whitespace-nowrap">
//                     Upcoming
//                 </Link>
//                 <Link href="/topup" className="whitespace-nowrap">
//                     Topups
//                 </Link>
//                 <Link href="#" className="whitespace-nowrap">
//                     Save with <span className="text-purple-400 font-bold">plus</span>
//                 </Link>
//                 <Link href="#" className="whitespace-nowrap">
//                     Explore eSIMs
//                 </Link>
//             </nav>
//         </header>
//     );
// }



import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "./UserMenu";
import LiveSearch from "./LiveSearch";

export default function Header() {
  const { user } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  

  return (
    <header className="w-full shadow-sm border-b border-neutral-800 sticky top-0 z-50 bg-[#1e1e1e]">
      {/* Top Header */}
      <div className="px-4 py-3 flex items-center justify-between min-h-[72px] gap-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="http://localhost:1337/uploads/Untitled_design_14_1_1_30fe7c121e.png"
              alt="Logo"
              width={36}
              height={36}
            />
            <span className="font-bold text-lg text-white hidden sm:inline">
              Keyzoo
            </span>
          </Link>
        </div>

        {/* Center: Search (Desktop only) */}
        <div className="hidden md:flex flex-1 max-w-3xl mx-4">
          <div className="relative w-full">
            <LiveSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-neutral-800 transition"
          >
            <Search className="h-5 w-5 text-white" />
          </button>

          {/* Cart */}
          <Link href="/cart" className="p-2 rounded-md hover:bg-neutral-800 transition">
            <FaShoppingCart className="text-xl text-white" />
          </Link>

          {/* User */}
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/sign-in" className="p-2 rounded-md hover:bg-neutral-800 transition">
              <FaUserCircle className="text-xl text-white" />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="md:hidden p-2 rounded-md hover:bg-neutral-800 transition"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav
        className={`bg-neutral-900 text-white px-4 py-2 flex items-center gap-5 text-sm font-medium overflow-x-auto transition-all duration-300 ${
          isNavOpen ? "block" : "hidden md:flex"
        }`}
      >
        <Link href="/store" className="whitespace-nowrap">
          Store
        </Link>
        <Link href="/upcoming" className="whitespace-nowrap">
          Upcoming
        </Link>
        <Link href="/topup" className="whitespace-nowrap">
          Topups
        </Link>
        <Link href="#" className="whitespace-nowrap">
          Save with <span className="text-purple-400 font-bold">plus</span>
        </Link>
        <Link href="#" className="whitespace-nowrap">
          Explore eSIMs
        </Link>
      </nav>

      {/* 🟣 Mobile Fullscreen Search */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[70] bg-[#1e1e1e] flex flex-col md:hidden">
          {/* Header (input + close button) */}
          <div className="flex items-center px-4 py-3 border-b border-neutral-800">
            {/* <Search className="h-5 w-5 text-gray-400 mr-3" /> */}
            <div className="flex-1">
              <LiveSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-3 text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Results (scrollable area) */}
          <div className="flex-1 overflow-y-auto p-2">
            {/* The LiveSearch component automatically renders results inside */}
          </div>
        </div>
      )}
    </header>
  );
}


