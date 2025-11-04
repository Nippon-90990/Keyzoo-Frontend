import { updateStrapiOrder } from "@/lib/strapi";

export default async function handler(req, res) {
  const { order_id, cf_payment_id, payment_status } = req.body;

  if (payment_status === "SUCCESS") {
    await updateStrapiOrder(order_id, {
      status: "paid",
      transaction_id: cf_payment_id,
    });
  }

  res.status(200).json({ ok: true });
}
