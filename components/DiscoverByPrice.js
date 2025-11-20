// components/DiscoverByPrice.js
import React from "react";
import useCurrency from "@/hook/useCurrency";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const priceRanges = [
    { label: "100" },
    { label: "200" },
    { label: "500" },
    { label: "1000" },
    { label: "1500" },
    { label: "2000" },
    { label: "2500" },
    { label: "5000" },
];

const DiscoverByPriceSkeleton = () => (
    <SkeletonTheme baseColor="#2a2a2a" highlightColor="#444">
        <div className="py-10 px-4">
            <Skeleton width={160} height={24} />

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:flex flex-wrap gap-4 mt-6">
                {Array(8)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl bg-[#2a2a2a] p-4 w-40 h-24 flex justify-center items-center"
                        >
                            <Skeleton width={80} height={20} />
                        </div>
                    ))}
            </div>
        </div>
    </SkeletonTheme>
);

export default function DiscoverByPrice() {

    const { symbol } = useCurrency();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 600); // smooth premium delay
        return () => clearTimeout(t);
    }, []);

    if (loading) return <DiscoverByPriceSkeleton />;

    return (
        <div className=" py-10 px-4">
            <h2 className=" text-lg sm:text-xl font-semibold mb-6">
                Discover By Price
            </h2>

            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:flex flex-wrap gap-4">
                {priceRanges.map((item, index) => (
                    <button
                        key={index}
                        className="bg-[#2a2a2a] hover:bg-[#333] transition-all text-white rounded-xl w-40 h-25 flex flex-col justify-center items-center shadow-sm cursor-pointer"
                    >
                        <span className="text-sm text-gray-400">Under</span>
                        <span className="text-xl font-semibold">{symbol} {item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
