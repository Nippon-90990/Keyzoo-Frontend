
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
              src="/logo-white.png"
              alt="Logo"
              width={120}
              height={100}
            />
            <span className="font-bold text-lg text-white hidden sm:inline">

            </span>
          </Link>
        </div>

        {/* Center: Search (Desktop only) */}
        <div className="hidden md:flex flex-1 max-w-6xl mx-auto px-4">
          <div className="relative w-full">
            <LiveSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            <Search className="absolute left-3 top-3 h-5 w-5 text-black" />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-3.5 flex-none">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-neutral-800 transition shrink-0"
            aria-label="Open search"
          >
            <Search className="h-5 w-5 text-white" />
          </button>

          {/* Cart (compact) */}
          <Link
            href="/cart"
            className="p-2 rounded-md hover:bg-neutral-800 transition relative shrink-0"
            aria-label="View cart"
          >
            <FaShoppingCart className="text-xl text-white" />
          </Link>

          {/* Auth area: shows buttons for public users, user menu for logged in */}
          {/* Auth area */}
          <div className="flex items-center gap-2 justify-end shrink-0">
            {user ? (
              <UserMenu user={user}/>
            ) : (
              <>
                {/* Desktop: show text buttons */}
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/sign-in"
                    aria-label="Sign in"
                    className="px-4 py-2 rounded-md border border-neutral-700 text-sm text-white hover:bg-neutral-800 transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    aria-label="Sign up"
                    className="px-4 py-2 rounded-md bg-purple-600 text-sm font-semibold text-white hover:bg-purple-700 transition"
                  >
                    Sign Up
                  </Link>
                </div>

                {/* Mobile fallback: compact user icon */}
                <Link
                  href="/sign-in"
                  className="md:hidden p-2 rounded-md hover:bg-neutral-800 transition shrink-0"
                  aria-label="Sign in"
                >
                  <FaUserCircle className="text-xl text-white" />
                </Link>
              </>
            )}
          </div>


          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="md:hidden p-2 rounded-md hover:bg-neutral-800 transition shrink-0"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>

      </div>

      {/* Bottom Navigation */}
      <nav
        className={`bg-neutral-900 text-white px-4 py-2 flex items-center gap-5 text-sm font-medium overflow-x-auto transition-all duration-300 ${isNavOpen ? "block" : "hidden md:flex"
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


