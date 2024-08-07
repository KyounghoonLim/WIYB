/**
 * svg loader 설정
 * https://opnay.com/p/8594d789-0ab3-4381-aed8-f1de34f14afc
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resource.kikiz.ai",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
    ],
  },
  webpack: function (config) {
    const svgLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...svgLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: svgLoaderRule.issuer,
        resourceQuery: { not: [...svgLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    svgLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
