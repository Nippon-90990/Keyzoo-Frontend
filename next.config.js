// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'active-reward-f841ad7084.media.strapiapp.com',
            },
            {
                protocol: 'https',
                hostname: 'playful-book-1c46d71b3d.media.strapiapp.com',
            },
            {
                protocol: 'https',
                hostname: 'stylish-gift-a7e817f55b.media.strapiapp.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'static.driffle.com',
            },
            {
                protocol: 'https',
                hostname: 'driffle.com',
            },
            {
                protocol: 'http',   // Use http for local development or specific vps server
                hostname: 'localhost',
            },
            {
                protocol: 'https',   // Use http for local development or specific vps server
                hostname: 'images.igdb.com',
            },
        ],
    },

};

module.exports = nextConfig;
