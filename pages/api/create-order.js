import { createStrapiOrder } from "@/lib/strapi";
import { stripe } from "@/lib/stripe";

export default async function handler(req, res) {
  const { items, user, gateway } = req.body;

  // 1️⃣ Create order in Strapi
  const order = await createStrapiOrder({
    user: user.id,
    status: "pending",
    items,
    total: items.reduce((t, i) => t + i.price * i.quantity, 0),
  });

  let paymentUrl = "";

  if (gateway === "stripe") {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map(item => ({
        price_data: {
          currency: "INR",
          product_data: { name: item.title },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
      // metadata: { strapiOrderId: order.id },
    });

    paymentUrl = session.url;

  } else if (gateway === "cashfree") {
    // ✅ Example Cashfree Link — adjust as per Cashfree SDK
    // Docs: https://docs.cashfree.com/docs/link-payments
    paymentUrl = `https://cashfree.com/pay/${order.id}`; // Replace with real Cashfree link
  }

  res.status(200).json({ orderId: order.id, paymentUrl });
}
