export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password, username, turnstileToken } = req.body;

    // 1️⃣ Verify Turnstile
    const tsRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                secret: process.env.TURNSTILE_SECRET_KEY,
                response: turnstileToken,
            }),
        }
    );

    const tsData = await tsRes.json();

    if (!tsData.success) {
        return res.status(400).json({
            error: "Security check failed",
        });
    }

    // 2️⃣ Forward request to Strapi default register route
    const strapiRes = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/auth/local/register`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, username }),
        }
    );

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
        return res.status(400).json({
            error: data?.error?.message || "Registration failed",
        });
    }

    return res.status(200).json(data);
}
