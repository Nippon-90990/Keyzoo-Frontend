import React from 'react'
import Image from 'next/image';

const forgotpassword = () => {
    return (
        <div className="flex min-h-screen items-center justify-center text-white">
            <div className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
                {/* Left: Form */}
                <div className="w-full md:w-1/2 bg-neutral-900 p-8 flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">Forgot password?</h2>

                    <p className="text-sm text-neutral-400">
                        Enter your email address below and we'll send you a link to reset your password.
                    </p>

                    <form className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm">Email</label>
                            <input
                                type="email"
                                //   value={email}
                                //   onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full mt-1 px-4 py-3 bg-neutral-800 rounded text-white outline-none"
                                placeholder="Enter your Email"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded font-semibold"
                        >
                            Reset Password
                        </button>
                    </form>

                    <div className="flex justify-between text-sm text-neutral-400">
                        <a href="/sign-in" className="hover:underline">
                            Already have an account? Login
                        </a>
                    </div>
                </div>

                {/* Right: Illustration */}
                <div className="hidden md:flex w-1/2 bg-neutral-800 items-center justify-center">
                    {/* <img src="https://driffle.com/_next/image?url=https%3A%2F%2Fstatic.driffle.com%2Fimages%2Fgirl-using-phone.png&w=828&q=75" alt="Illustration" className="w-3/4" /> */}
                    <Image src="/3d/reset_password.png" width={512} height={512} />
                </div>
            </div>
        </div>
    );
}

export default forgotpassword