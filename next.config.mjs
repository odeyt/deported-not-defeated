/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["pdfkit"],
  },
  outputFileTracingIncludes: {
    "/api/checklist": ["./node_modules/pdfkit/js/data/**/*"],
  },
};

export default nextConfig;
