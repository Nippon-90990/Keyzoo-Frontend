import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async signIn({ user }) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}api/auth/social-login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.name,
                        provider: "google",
                    }),
                }
            );

            const data = await res.json();

            if (data.jwt) {
                user.jwt = data.jwt;
                user.strapiUser = data.user;
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.jwt = user.jwt;       // ✔ store Strapi JWT
                token.user = user.strapiUser;
            }
            return token;
        },

        async session({ session, token }) {
            session.jwt = token.jwt;      // ✔ expose Strapi JWT
            session.user = token.user;
            return session;
        },
    },
};

export default NextAuth(authOptions);
