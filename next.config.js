/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // not used for user photos (those are plain img tags), but handy if you
    // ever switch to next/image with a google avatar or an image host
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },
};

module.exports = nextConfig;
