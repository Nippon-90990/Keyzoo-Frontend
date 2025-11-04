import { useState } from "react";

export default function TopUpPage() {
    const [form, setForm] = useState({
        game: "",
        userId: "",
        amount: "",
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/topup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            setResult({ error: "Something went wrong" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-12 p-6 bg-[#1a1a1a] text-white rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Game Top-Up</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm text-gray-300">Select Game</label>
                    <select
                        name="game"
                        value={form.game}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[#111] border border-gray-600"
                        required
                    >
                        <option value="">-- Choose a Game --</option>
                        <option value="freefire">Free Fire</option>
                        <option value="pubg">PUBG Mobile</option>
                        <option value="steam">Steam Wallet</option>
                        <option value="valorant">Valorant</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-300">Player ID / UID</label>
                    <input
                        type="text"
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        placeholder="Enter your player ID"
                        className="w-full p-2 rounded bg-[#111] border border-gray-600"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-300">Amount / Points</label>
                    <select
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[#111] border border-gray-600"
                        required
                    >
                        <option value="">-- Select Denomination --</option>
                        <option value="60">60 Diamonds</option>
                        <option value="120">120 Diamonds</option>
                        <option value="310">310 Diamonds</option>
                        <option value="620">620 Diamonds</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#814DE5] hover:bg-[#6C34D8] py-2 rounded-lg font-semibold transition"
                >
                    {loading ? "Processing..." : "Top Up Now"}
                </button>
            </form>

            {result && (
                <div className="mt-6 text-sm">
                    {result.error ? (
                        <p className="text-red-500">{result.error}</p>
                    ) : (
                        <p className="text-green-400">
                            ✅ {result.message || "Top-up request sent successfully!"}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
