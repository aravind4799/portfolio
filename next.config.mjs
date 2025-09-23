const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co', 
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com', 
        port: '',
        pathname: '/**',
      },
    ],
  },
  // ADDED: This block enables polling, which is a reliable way to
  // ensure Hot Module Replacement (HMR) works correctly in WSL or Docker.
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Add a delay before rebuilding
    };
    return config;
  },
};

export default nextConfig;