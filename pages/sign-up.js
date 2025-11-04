// pages/sign-up.js
import { React, useState } from 'react';
import { useRouter } from 'next/router';
import PasswordInput from '@/components/PasswordInput';
import Image from 'next/image';

export default function SignUpPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // ✅ Confirm password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        // "https://playful-book-1c46d71b3d.strapiapp.com/api/auth/local/register",
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/auth/local/register`, // Ensure this is the correct URL for your Strapi API
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email.split("@")[0], // Strapi requires a username
            email,
            password,
            // dob, // this will only work if your Strapi user model has a dob field
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully!");
        console.log("User Data:", data);
        setTimeout(() => {
          router.push("/"); // Redirect to homepage
        }, 1000);
      } else {
        setError(data?.error?.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <div className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 bg-neutral-900 p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Create your account</h2>

          <button
            className="flex items-center justify-center gap-2 bg-neutral-800 outline-none w-full py-3 rounded hover:bg-white text-white hover:text-black transition"
          >
            <img src="https://driffle.com/icons/google-icon.svg" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-neutral-800 outline-none w-full py-3 rounded hover:bg-white text-white hover:text-black transition"
          >
            <img src="https://driffle.com/icons/facebook-round-icon.svg" alt="Facebook" className="w-5 h-5" />
            Sign up with Facebook
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-neutral-800 outline-none w-full py-3 rounded hover:bg-white text-white hover:text-black transition"
          >
            <img src="https://driffle.com/icons/discord-icon-new.svg" alt="Discord" className="w-5 h-5" />
            Sign up with Discord
          </button>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 bg-neutral-800 rounded text-white outline-none"
                placeholder="Enter your Email"
              />
            </div>

            <div>
              <label className="text-sm">Password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
              />
            </div>

            <div>
              <label className="text-sm">Confirm Password</label>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your Password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded font-semibold mt-5"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-sm text-neutral-400">
            Already have an account?{" "}
            <a href="/sign-in" className="hover:underline">
              Login
            </a>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex w-1/2 bg-neutral-800 items-center justify-center">
          {/* <img src="https://driffle.com/_next/image?url=https%3A%2F%2Fstatic.driffle.com%2Fimages%2Fgirl-using-phone.png&w=828&q=75" alt="Illustration" className="w-3/4" /> */}
          <Image src={"/3d/register.png"} height={512} width={512}/>
        </div>
      </div>
    </div>
  );
}
