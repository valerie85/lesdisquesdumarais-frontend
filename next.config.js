/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Ajoute Cloudinary aux domaines autorisés
  },
  reactStrictMode: true,
  // ... vos autres configurations
};

module.exports = nextConfig;
