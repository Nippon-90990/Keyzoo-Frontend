// pages/api/checkout.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No items in cart" });
        }

        // Convert cart items to Stripe line_items
        const line_items = items.map(item => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    images: [item.image], // your image field
                },
                unit_amount: Math.round(item.price * 100), // in cents
            },
            quantity: item.quantity,
        }));

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
            metadata: {
                cart: JSON.stringify(items), // pass cart for later order creation
            },
        });

        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error("Checkout API Error:", err);
        res.status(500).json({ error: "Failed to create session" });
    }
}
