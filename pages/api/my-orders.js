// pages/api/my-orders.js

import { getAuth } from '@clerk/nextjs/server';

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const ordersRes = await fetch(`${STRAPI_API_URL}/api/orders?filters[userId][$eq]=${userId}&populate[products][populate]=*&populate[gamekeys][populate]=product`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    const ordersData = await ordersRes.json();

    const orders = ordersData?.data?.map(order => {
      const { id, attributes } = order;

      return {
        id,
        createdAt: attributes.createdAt,
        products: attributes.products?.data?.map(p => ({
          title: p.attributes.title,
          id: p.id,
        })),
        gamekeys: attributes.gamekeys?.data?.map(k => ({
          key: k.attributes.key,
          game: k.attributes.product?.data?.attributes?.title,
        })),
      };
    });

    return res.status(200).json({ orders });

  } catch (err) {
    console.error('Failed to fetch user orders:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
