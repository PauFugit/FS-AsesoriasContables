/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' https://maps.googleapis.com; frame-src https://www.google.com; style-src 'self' 'unsafe-inline';"
            },
          ],
        },
      ]
    },
  }

export default nextConfig;
