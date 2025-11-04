// Profile Page Component
import AccountLayout from "@/components/AccountLayout";
import { React, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProfilePage() {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem("jwt");

    //     if (!token) {
    //         router.push("/sign-in");
    //         return;
    //     }

    //     fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/users/me`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     })
    //         .then(async (res) => {
    //             if (!res.ok) {
    //                 throw new Error("Failed to fetch user data");
    //             }
    //             return res.json();
    //         })
    //         .then((data) => {
    //             setUser(data);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             setError("Error fetching profile");
    //             setLoading(false);
    //         });
    // }, []);

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            router.push("/sign-in");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/me?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err);
                setError("Error fetching profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleUpdateUsername = async () => {
        if (!username.trim() || username === user.username) return;

        const token = localStorage.getItem("jwt");
        if (!token) return;

        setUpdating(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username }),
            });

            if (!res.ok) throw new Error("Failed to update username");

            const updatedUser = await res.json();

            // ✅ Update the UI instantly
            setUser((prev) => ({ ...prev, username: updatedUser.username }));
            alert("Username updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Error updating username");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;


    return (

        <AccountLayout>
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            <div className="flex flex-col items-center justify-center w-full">
                <div className="bg-[#1a1a1a] p-6 rounded-lg space-y-6 w-full max-w-2xl">
                    <div className="flex justify-center">
                        <Image
                            src={user?.avatar || "/avatar.png"} // Fallback image if avatar is not set
                            alt="Profile Picture"
                            className=" rounded-full object-center"
                            width={150}
                            height={150}
                        />
                    </div>
                    <div className="space-y-6">
                        {/* Display Name */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-400">Display Name</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={user?.username || ""}
                                    disabled
                                    className="flex-1 px-4 py-3 rounded-md bg-[#1e1e1e] text-white border border-neutral-700 focus:outline-none cursor-not-allowed"
                                    // px-4 py-2
                                />
                                <button
                                    onClick={handleUpdateUsername}
                                    disabled={updating || username === user?.username}
                                    className="ml-4 px-4 py-2 rounded-full bg-[#313843] text-white hover:bg-[#3a4450] transition">
                                    Update
                                </button>
                            </div>
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-400">Email Address</label>
                            <div className="flex items-center relative">
                                <input
                                    type="text"
                                    value={user?.email || ""}
                                    readOnly
                                    className="flex-1 px-4 pr-20 py-3 rounded-md bg-[#1e1e1e] text-white border border-neutral-700 focus:outline-none"
                                />
                                {user?.confirmed ? (
                                    <span className="absolute right-[112px] top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-green-900 text-green-400 border border-green-600 rounded">
                                        VERIFIED
                                    </span>
                                ) : (
                                    <span className="absolute right-[112px] top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-red-900 text-red-400 border border-red-600 rounded">
                                        NOT VERIFIED
                                    </span>
                                )}
                                <button className="ml-4 px-4 py-2 rounded-full bg-[#313843] text-white hover:bg-[#3a4450] transition">
                                    Update
                                </button>
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-400">Date of Birth</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    // value={dob}
                                    // onChange={(e) => setDob(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-md bg-[#1e1e1e] text-white border border-neutral-700 focus:outline-none"
                                    readOnly
                                />
                                <button className="ml-4 px-4 py-2 rounded-full bg-[#313843] text-white hover:bg-[#3a4450] transition">
                                    Update
                                </button>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-400">Password</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value="Reset link will be sent on registered email"
                                    readOnly
                                    className="flex-1 px-4 py-3 rounded-md bg-[#1e1e1e] text-white border border-neutral-700 focus:outline-none"
                                />
                                <button className="ml-4 px-4 py-2 rounded-full bg-[#313843] text-white hover:bg-[#3a4450] transition">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}
