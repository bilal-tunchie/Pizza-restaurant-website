/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "mponlineassets.s3.me-south-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    }
}

module.exports = nextConfig
