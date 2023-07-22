const { withAxiom } = require("next-axiom");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [
      {
        source: "/remote/:path*",
        destination: process.env.REMOTE_SERVER + "/:path*",
      },
    ];
  },
};

module.exports = withAxiom(nextConfig);
