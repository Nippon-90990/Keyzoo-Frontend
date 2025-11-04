// "use client";
import { useEffect, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import { FaUserCircle, FaGoogleWallet, FaHome, FaHandsHelping } from "react-icons/fa";
import { IoGameControllerSharp, IoBagCheck, IoLogOut } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext"; // Assuming you have an AuthContext for user state management

export default function UserMenu() {

  // const [user, setUser] = useState(null);
  const { user, logout } = useAuth(); // Use context to get user data and logout function

  // useEffect(() => {
  //   // Load user from localStorage on component mount
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to homepage after logout
  };


  return (
    <Popover className="relative">
      <PopoverButton className="text-2xl text-white focus:outline-none">
        <FaUserCircle />
      </PopoverButton>

      <PopoverPanel
        anchor="bottom end"
        className="absolute right-0 z-50 mt-2 w-75 divide-y divide-gray-700 rounded-lg bg-[#1a1a1a] shadow-lg ring-1 ring-black/5"
      >
        <div className="p-2">
          <Link
            href="/user/profile"
            className="flex gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded"
          >
            <FaUserCircle className="text-2xl" /> My Profile
          </Link>
          <Link
            href="/user/library"
            className="flex gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded"
          >
            <IoGameControllerSharp className="text-2xl" /> My Library
          </Link>
          <Link
            href="/user/wallet"
            className="flex gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded"
          >
            <FaGoogleWallet className="text-2xl" /> Wallet {/*{user?.publicMetadata?.balance && `€${user.publicMetadata.balance}`}*/}
          </Link>
          <Link
            href="/user/orders"
            className="flex gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded"
          >
            <IoBagCheck className="text-2xl" /> My Orders
          </Link>
          {/* <Link
            href="/user/seller"
            className="flex gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded"
          >
            <FaHome className="text-2xl" /> Seller Dashboard
          </Link> */}
          <Link
            href="/user/help"
            className="flex gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded"
          >
            <FaHandsHelping className="text-2xl" /> Help Center
          </Link>
        </div>
        <div className="p-2">

          {user && (
            <button
              onClick={handleLogout}
              className="flex gap-3 w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-800 rounded"
            >
              <IoLogOut className="text-2xl" /> Logout
            </button>
          )}

        </div>
      </PopoverPanel>
    </Popover>
  );
}
