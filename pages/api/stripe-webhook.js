import { buffer } from "micro";
import { stripe } from "@/lib/stripe";
import { updateStrapiOrder } from "@/lib/strapi";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.strapiOrderId;

    await updateStrapiOrder(orderId, {
      status: "paid",
      transaction_id: session.payment_intent,
    });
  }

  res.status(200).json({ received: true });
}
