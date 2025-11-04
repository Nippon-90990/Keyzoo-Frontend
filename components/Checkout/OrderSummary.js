// components/Checkout/OrderSummary.js

import Image from "next/image";
import { CiTrash } from "react-icons/ci";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { useState } from "react";
import useCurrency from "@/hook/useCurrency";
import { loadStripe } from "@stripe/stripe-js";


export default function OrderSummary({ cartItems, onRemove, onIncrease, onDecrease }) {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const { symbol } = useCurrency();
    const [coupon, setCoupon] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [loading, setLoading] = useState(false);

    // Subtotal of products
    const subtotal = cartItems.reduce(
        (acc, item) => acc + ((item.price || 0) * (item.quantity || 0)),
        0
    );

    const defaultCommissionPercent = 10; // fallback

    const totalCommission = cartItems.reduce((acc, item) => {
        const percent = item.commission ?? defaultCommissionPercent;
        return acc + ((item.price * (percent / 100)) * item.quantity);
    }, 0);

    // Suppose discount is dynamic — you can pull this from user membership
    const commissionDiscountPercent = 10; // 15% off on commission

    const commissionDiscountAmount = totalCommission * (commissionDiscountPercent / 100);
    const netCommission = totalCommission - commissionDiscountAmount;

    const total = subtotal + netCommission;

    const handleApplyCoupon = async () => {
        if (!coupon.trim()) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/coupons?filters[code][$eq]=${coupon}`);
            const data = await res.json();

            const foundCoupon = data.data[0];

            if (!foundCoupon) {
                alert("Invalid coupon code.");
                setDiscountPercent(0);
                return;
            }

            const { discountPercent: percent, isActive } = foundCoupon.attributes;

            if (!isActive) {
                alert("This coupon is not active.");
                setDiscountPercent(0);
                return;
            }

            setDiscountPercent(percent);
            alert(`Coupon applied! You got ${percent}% OFF`);

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Try again.");
        }
    };

    // 🔹 Handle checkout call
    // const handleCheckout = async () => {
    //     if (cartItems.length === 0) {
    //         alert("Your cart is empty.");
    //         return;
    //     }

    //     setLoading(true);
    //     // try {
    //     //     const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/checkout/session`, {
    //     //         method: "POST",
    //     //         headers: { "Content-Type": "application/json" },
    //     //         body: JSON.stringify({
    //     //             items: cartItems.map(item => ({
    //     //                 productId: item.id,
    //     //                 quantity: item.quantity,
    //     //             })),
    //     //             email: "test@example.com", // later replace with actual user email
    //     //             currency: "usd",
    //     //         }),
    //     //     });

    //     //     const data = await res.json();

    //     //     if (data.checkoutUrl) {
    //     //         window.location.href = data.checkoutUrl; // Redirect to Stripe
    //     //     } else {
    //     //         alert("Failed to create checkout session");
    //     //         console.error("Stripe API error:", data);
    //     //     }
    //     // } catch (err) {
    //     //     console.error("Checkout error:", err);
    //     //     alert("Something went wrong!");
    //     // } finally {
    //     //     setLoading(false);
    //     // }

    //     const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/checkout/session`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer`, // if protected
    //         },
    //         body: JSON.stringify({
    //             items: cart.map((product) => ({
    //                 title: product.title,
    //                 price: product.price,
    //                 image: product.image?.url, // your image field
    //                 quantity: product.quantity,
    //             })),
    //         }),
    //     });

    //     const data = await res.json();
    //     if (data.url) {
    //         window.location.href = data.url;
    //     } else {
    //         console.error("Stripe error:", data);
    //     }
    // };    THIS IS THE OLD CODE, I DID NOT USE IT BECAUSE IT WAS NOT TESTED AND I DID NOT WANT TO BREAK THE CODE, SO I USED THE NEW CODE BELOW...

    // const handleCheckout = async () => {
    //     try {
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/checkout/session`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 cartItems,
    //                 email: "buyer@example.com", // later replace with logged-in user email
    //                 userId: "123",              // replace with actual Clerk/Strapi user id
    //             }),
    //         });

    //         const data = await res.json();

    //         if (data.url) {
    //             const stripe = await stripePromise;
    //             window.location.href = data.url; // ✅ Redirect user to Stripe checkout
    //         } else {
    //             alert("Failed to start checkout");
    //         }
    //     } catch (err) {
    //         console.error("Checkout error:", err);
    //         alert("Something went wrong");
    //     }
    // };   // THIS IS THE NEW CODE, I USED IT BECAUSE IT WAS TESTED AND I DID NOT WANT TO BREAK THE CODE, SO I USED THE NEW CODE BELOW...

    // components/Checkout/OrderSummary.js (handler)
    // const handleCheckout = async () => {
    //     try {
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/checkout/session`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 cartItems: cartItems.map(i => ({
    //                     title: i.title,
    //                     price: i.price,
    //                     image: i.image,     // you said you use `image`
    //                     quantity: i.quantity,
    //                 })),
    //                 // email: "buyer@example.com", // optional; Checkout can collect too
    //             }),
    //         });

    //         const data = await res.json();
    //         if (data.url) {
    //             window.location.href = data.url;
    //         } else {
    //             alert("Failed to start checkout");
    //             console.error(data);
    //         }
    //     } catch (e) {
    //         console.error(e);
    //         alert("Checkout failed");
    //     }
    // };

    // New handle checkout function with userId and email
    
    const handleCheckout = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const jwt = localStorage.getItem("jwt");

            if (!user || !jwt) {
                alert("Please log in to continue checkout");
                return;
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}api/checkout/session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`, // ✅ Send JWT
                    },
                    body: JSON.stringify({
                        cartItems,
                        email: user.email,   // ✅ from Strapi user
                        userId: user.id,     // ✅ required by checkout controller
                    }),
                }
            );

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe
            } else {
                console.error("Stripe error:", data);
                alert("Failed to start checkout");
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Something went wrong");
        }
    };




    return (
        <div className="bg-[#1a1a1a] p-6 rounded-lg space-y-4">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <ul className="space-y-4">
                {cartItems.map((item) => (
                    <li key={item.id} className="flex gap-4">
                        <Image
                            src={item.image}
                            alt={item.title}
                            height={120}
                            width={90}
                            className="w-[90px] h-[120px] rounded object-cover flex-shrink-0"
                        />

                        <div className="flex flex-col flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm leading-tight break-words">
                                {item.title}
                            </h3>

                            <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                                <button onClick={() => onRemove(item.id)}>
                                    <CiTrash className="text-2xl text-white" />
                                </button>
                                <button onClick={() => onDecrease(item.id)} className="bg-[#1a1a1a] text-white rounded w-[24px] h-[24px] flex items-center justify-center">
                                    <LuMinus className="text-xl text-white" />
                                </button>
                                <span className="text-white rounded w-[24px] h-[24px] flex items-center justify-center">
                                    {item.quantity}
                                </span>
                                <button onClick={() => onIncrease(item.id)} className="bg-[#1a1a1a] text-white rounded w-[24px] h-[24px] flex items-center justify-center">
                                    <LuPlus className="text-xl text-white" />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-4 md:hidden">
                <label className="block text-sm mb-1">Have a coupon?</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-2 rounded bg-[#1a1a1a] border border-gray-700 text-sm text-white outline-none"
                    />
                    <button
                        onClick={handleApplyCoupon}
                        className="bg-[#3b82f6] hover:bg-[#2563eb] px-4 py-2 rounded text-white text-sm"
                    >
                        Apply
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-700 pt-4 space-y-1 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{symbol} {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>{symbol} {totalCommission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-500">
                    <span>Commission Discount </span>   {/*({commissionDiscountPercent}%)*/}
                    <span>-{symbol} {commissionDiscountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{symbol} {total.toFixed(2)}</span>
                </div>
            </div>
            <p className="text-xs text-gray-500">
                By proceeding through checkout, I acknowledge I have read and accepted the Terms and Conditions including the Privacy Policy and Refund Policy.
            </p>
            <button onClick={handleCheckout} className="space-y-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded font-semibold cursor-pointer">Pay Now</button>
        </div>
    );
}