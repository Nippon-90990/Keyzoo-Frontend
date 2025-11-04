// pages/sign-in.js
import PasswordInput from '@/components/PasswordInput';
import { React, useState } from 'react';
import { useRouter } from 'next/router';
import { set } from 'nprogress';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function SignInPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);
  //   setSuccess('');

  //   try {
  //     const res = await fetch(
  //       "https://playful-book-1c46d71b3d.strapiapp.com/api/auth/local",   // Adjust the URL to your Strapi API endpoint weith correct path and env
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           identifier: email,
  //           password: password
  //         })
  //       }
  //     );

  //     const data = await res.json();

  //     if (res.ok) {
  //       localStorage.setItem('jwt', data.jwt);
  //       localStorage.setItem("user", JSON.stringify(data.user));
  //       setSuccess('Login successful!');
  //       console.log('User Data:', data);
  //       setTimeout(() => {
  //         router.push("/"); // Redirect to homepage
  //       }, 1000);
  //     } else {
  //       setError(data.error?.message || 'Login failed');
  //     }
  //   } catch (err) {
  //     setError('Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess('');

    try {
      const res = await fetch(
        // "https://playful-book-1c46d71b3d.strapiapp.com/api/auth/local",
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/auth/local`, // Ensure this is the correct URL for your Strapi API
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: email,
            password: password
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Save to localStorage
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));

        // ✅ Update AuthContext immediately so UI changes without reload
        login(data.user, data.jwt);

        setSuccess('Login successful!');
        console.log('User Data:', data);

        // Redirect after short delay
        setTimeout(() => {
          router.push('/');
        }, 500);
      } else {
        setError(data.error?.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <div className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 bg-neutral-900 p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Welcome back</h2>

          <button
            className="flex items-center justify-center gap-2 w-full py-3 rounded bg-neutral-800 hover:bg-white hover:text-black outline-none transition"
          >
            <img src="https://driffle.com/icons/google-icon.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <button
            className="flex items-center justify-center gap-2 w-full py-3 rounded bg-neutral-800 hover:bg-white hover:text-black transition"
          >
            <img src="https://driffle.com/icons/facebook-round-icon.svg" alt="Facebook" className="w-5 h-5" />
            Continue with Facebook
          </button>

          <button
            className="flex items-center justify-center gap-2 w-full py-3 rounded bg-neutral-800 hover:bg-white hover:text-black transition"
          >
            <img src="https://driffle.com/icons/discord-icon-new.svg" alt="Discord" className="w-5 h-5" />
            Continue with Discord
          </button>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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

            {error && <p className="text-red-500 mb-3">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded font-semibold"
            >
              Login
            </button>
          </form>

          <div className="flex justify-between text-sm text-neutral-400">
            <a href="/sign-up" className="hover:underline">
              Don't have an account? Sign up
            </a>
            <a href="/forgot-password" className="hover:underline">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex w-1/2 bg-neutral-800 items-center justify-center">
          {/* <img src="https://driffle.com/_next/image?url=https%3A%2F%2Fstatic.driffle.com%2Fimages%2Fgirl-using-phone.png&w=828&q=75" alt="Illustration" className="w-3/4" /> */}
          <Image src="/3d/login.png" width={512} height={512} />
        </div>
      </div>
    </div>
  );
}
