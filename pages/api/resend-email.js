// pages/api/resend-email.js

import { getAuth } from '@clerk/nextjs/server';
import { Resend } from 'resend';

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, sessionClaims } = getAuth(req);
  if (!userId || !sessionClaims?.email_address) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const email = sessionClaims.email_address;
  const { orderId } = req.body;

  if (!orderId) return res.status(400).json({ error: 'Order ID is required' });

  try {
    // Get the order from Strapi
    const orderRes = await fetch(`${STRAPI_API_URL}/api/orders/${orderId}?populate[gamekeys][populate]=product`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    const orderData = await orderRes.json();

    const order = orderData?.data;

    if (!order || order.attributes.userId !== userId) {
      return res.status(403).json({ error: 'Not your order' });
    }

    const keyDetails = order.attributes.gamekeys?.data?.map((k) => ({
      key: k.attributes.key,
      game: k.attributes.product?.data?.attributes?.title,
    }));

    if (!keyDetails || keyDetails.length === 0) {
      return res.status(400).json({ error: 'No game keys found in this order' });
    }

    // Send email again via Resend
    await resend.emails.send({
      from: 'noreply@yourstore.com',
      to: email,
      subject: 'Your Game Keys (Resent)',
      html: `
        <h2>Here's a copy of your purchased game keys:</h2>
        <ul>
          ${keyDetails.map(k => `<li><strong>${k.game}:</strong> ${k.key}</li>`).join('')}
        </ul>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Failed to resend email:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
