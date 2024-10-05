/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['gk5flxbicoiece78.public.blob.vercel-storage.com']
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://newasesoriasvaldivia.vercel.app" }, // Update this to your frontend URL
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
}

export default nextConfig;
