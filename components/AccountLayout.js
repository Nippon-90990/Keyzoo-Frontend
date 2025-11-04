import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserCircle, FaGoogleWallet, FaHome, FaHandsHelping } from "react-icons/fa";
import { IoGameControllerSharp, IoBagCheck, IoLogOut } from "react-icons/io5";

export default function AccountLayout({ children }) {
    const router = useRouter();

    const navLinks = [
        { href: "/user/profile", icon: <FaUserCircle />, label: "My Profile" },
        { href: "/user/library", icon: <IoGameControllerSharp />, label: "My Library" },
        { href: "/user/wallet", icon: <FaGoogleWallet />, label: "Wallet" },
        { href: "/user/orders", icon: <FaHandsHelping />, label: "My Orders" },
        // { href: "/account/store", icon: <FaStore />, label: "My Store" },
        // { href: "/account/settings", icon: <FaCog />, label: "Store Settings" },
    ];


    return (
        <div className="flex min-h-screen text-white">
            {/* Sidebar */}
            <aside className="w-64 p-6 bg-[#1a1a1a]">
                <nav className="space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${router.pathname === link.href ? "bg-gray-800" : ""
                                }`}
                        >
                            <span className="text-lg">{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>


            {/* Main Content */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
