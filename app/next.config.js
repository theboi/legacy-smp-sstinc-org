import("dotenv").then((o) => o.config());

module.exports = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/theatre",
        permanent: false,
      },
      {
        source: "/home",
        destination: "/theatre",
        permanent: false,
      },
    ];
  },
};
