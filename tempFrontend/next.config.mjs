/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.material-tailwind.com'], // Allow external images from this domain
      },
      webpack: (config, { isServer }) => {
        // Custom webpack configurations can be added here
        if (!isServer) {
          config.resolve.fallback = {
            fs: false,
            path: false,
          };
        }
        return config;
      },
      env: {
        MY_CUSTOM_ENV_VAR: process.env.MY_CUSTOM_ENV_VAR, // Custom environment variable
      },
};


export default nextConfig;
