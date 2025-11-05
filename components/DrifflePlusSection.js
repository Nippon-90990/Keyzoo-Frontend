// DrifflePlusSection.js
// import { CheckCircle2 } from "lucide-react";
import { CircleCheckBig } from 'lucide-react';
import Link from "next/link";

export default function DrifflePlusSection() {
    return (
        <div className="w-full flex flex-col md:flex-row min-h-[450px] text-white">

            {/* Left: Join now section */}
            <div className="w-full md:w-1/2 relative flex items-center justify-center p-10 bg-[#111] rounded-l-4xl">
                <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-tr from-purple-900 to-transparent opacity-20 rounded-4xl"></div>
                <div className="absolute w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 -left-10 sm:-left-16 top-1/2 -translate-y-1/2 z-0 opacity-20 rotate-0">
                    <svg viewBox="0 0 276 276" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <mask id="mask0_13784_66060" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="276" height="276">
                            <path d="M0 276H276V0H0V276Z" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_13784_66060)">
                            <path opacity="0.2" d="M107.084 3.93628C103.176 3.93628 100.007 7.10472 100.007 11.0132V94.3334C100.007 98.2419 96.839 101.41 92.9305 101.41H12.6004C8.69189 101.41 5.52344 104.579 5.52344 108.487V169.681C5.52344 173.59 8.69188 176.758 12.6004 176.758H92.9305C96.839 176.758 100.007 179.927 100.007 183.835V266.557C100.007 270.466 103.176 273.634 107.084 273.634H167.681C171.589 273.634 174.757 270.466 174.757 266.557V183.835C174.757 179.927 177.926 176.758 181.834 176.758H262.165C266.073 176.758 269.241 173.59 269.241 169.681V108.487C269.241 104.579 266.073 101.41 262.165 101.41H181.834C177.926 101.41 174.757 98.2418 174.757 94.3334V11.0132C174.757 7.10471 171.589 3.93628 167.681 3.93628H107.084Z" fill="url(#paint0_linear_13784_66060)" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_13784_66060" x1="5.9737" y1="5.51396" x2="268.361" y2="273.184" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EA69FF" />
                                <stop offset="1" stopColor="#999999" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
                        Get extra discounts with <br />
                        Driffle Keys <span className="text-purple-500">plus</span>
                    </h2>

                    <Link href={'/comingsoon'}>
                        <button className="mt-6 px-6 py-2 rounded-md bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">
                            Join now
                        </button>
                    </Link>
                </div>
            </div>

            {/* Right: Perks */}
            <div className="w-full md:w-1/2 bg-gradient-to-r from-purple-700 to-purple-500 p-10 flex items-center rounded-r-4xl">
                <div className="space-y-4 max-w-lg">
                    <h3 className="text-2xl font-bold text-white">Perks of Driffle Key Plus</h3>

                    <ul className="space-y-3 text-white text-sm sm:text-base">
                        <li className="flex items-start gap-3">
                            <CircleCheckBig className="text-white mt-0.5" size={18} />
                            <span>Up to 10% OFF on Games, Gift Cards, DLCs and more</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CircleCheckBig className="text-white mt-0.5" size={18} />
                            <span>Access to exclusive sale events and promotions</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CircleCheckBig className="text-white mt-0.5" size={18} />
                            <span>Priority pre-order fulfillment</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CircleCheckBig className="text-white mt-0.5" size={18} />
                            <span>Priority support</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
