import { clerkClient } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    const { dob } = req.body;

    if (!dob) {
        return res.status(400).json({ error: "Missing dob" });
    }

    try {
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                dateOfBirth: dob,
            },
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update DOB" });
    }
}
