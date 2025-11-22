const config = {
  plugins: {
    "@tailwindcss/postcss": {
      theme: {
        extend: {
          animation: {
            'spin-slow': 'spin 8s linear infinite',
            'spin-slow-reverse': 'spin 10s linear infinite reverse',
          }
        },
      },
    },
  },
};

export default config;
