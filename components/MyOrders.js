// ok so this is the finale code now i want make it dynamic order all data come from strapi 
// components/MyOrders.js
import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import Image from "next/image";

const orders = [
    {
        id: "VF09GOiK",
        date: "Apr 13, 2025",
        amount: "EUR 2.20",
        status: "SUCCESS",
        product: {
            title: "Steam Wallet 99 INR Gift Card (India) - Digital Key",
            region: "INDIA",
            image: "https://static.driffle.com/images/2f398399-fe1a-4364-8943-56f1ccb5b735.webp",
            // quantity: 2,
        },
    },
    {
        id: "IYDx9XX5",
        date: "Mar 30, 2025",
        amount: "INR 1061.50",
        status: "CANCELLED",
        product: {
            title: "Grand Theft Auto V Premium Online Edition (Global) (PC) - Rockstar - Digital Key",
            region: "GLOBAL",
            image: "https://static.driffle.com/images/2f398399-fe1a-4364-8943-56f1ccb5b735.webp",
            quantity: 1,
        },
    },
];

export default function MyOrders() {

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("All Orders");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) return;

        const fetchUser = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        };

        fetchUser();
    }, []);

    // ✅ Fetch orders for that user
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token || !user?.id) return;

        const fetchOrders = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}api/orders?populate=*`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch orders");

                const data = await res.json();
                setOrders(data.data); // 👈 orders come under data.data
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <p className="text-center text-white">Loading orders...</p>;

    return (
        <div className="min-h-screen text-white px-6 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold">My Order</h1>
                <div className="flex flex-col md:flex-row gap-3 md:items-center">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search By Product Title"
                            className="bg-neutral-900 text-white pl-10 pr-4 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                    {/* Sort Dropdown */}
                    <button className="bg-neutral-900 px-4 py-2 rounded-md flex items-center gap-2">
                        Order Date <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
                {["All Orders", "Successful Orders", "Unsuccessful & Refunded Orders", "Pending Orders"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded-md font-medium ${filter === tab ? "bg-white text-black" : "bg-neutral-900 text-gray-300"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="flex flex-col gap-6">
                {orders.length === 0 ? (
                    <p className="text-gray-400 flex items-center justify-center h-[100vh]">No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-[#1a1a1a] rounded-xl border border-gray-700 p-4 text-white">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <div className="space-x-16 flex text-sm text-gray-300 gap-50">
                                    <p>
                                        <span className="block text-xs text-gray-400">Order placed on</span>
                                        <span className="font-semibold text-white">{order.createdAt}</span>
                                    </p>
                                    <p>
                                        <span className="block text-xs text-gray-400">Order Amount</span>
                                        <span className="font-semibold text-white">{order.currency} {order.totalAmount}</span>
                                    </p>
                                    <p>
                                        <span className="block text-xs text-gray-400">Order ID</span>
                                        <span className="font-semibold text-white">{order.orderNumber}</span>
                                    </p>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <span className="text-xs bg-[#01b40133] text-[#01b401] p-[6px] rounded-lg uppercase">
                                        {order.deliveryStatus}
                                    </span>
                                    <button className=" px-[10px] py-[8px] text-sm rounded-md text-[#808080] bg-[#80808033] cursor-pointer">
                                        View Order Details
                                    </button>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-700 mb-3"></div>

                            {/* Product */}
                            {order.cartSnapshot.map((item, index) => (
                                <div key={item.id || index} className="flex space-x-10 mb-4 mt-4">
                                    <div className="relative">
                                        <Image
                                            src={item.image}
                                            alt="Product Cover"
                                            height={200}
                                            width={150}
                                            className="object-center rounded-xl "
                                        />
                                    </div>

                                    <div className="flex flex-col justify-start space-y-1">
                                        <h3 className="font-semibold text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-blue-400 text-sm font-medium mt-1 uppercase">{item.region}</p>
                                        {/* ✅ Show Keys */}
                                        <div className="mt-3 space-y-2">
                                            {order.assignedKeys
                                                ?.filter((k) => k.product === item.title) // match correct product
                                                .map((k, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="bg-neutral-800 border border-gray-700 px-3 py-2 rounded-md text-sm font-mono text-green-400"
                                                    >
                                                        {k.key}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )))}
            </div>
        </div>
    );
}
