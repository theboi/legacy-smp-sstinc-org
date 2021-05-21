import("dotenv").then((o) => o.config());

module.exports = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NOTION_API_KEY: process.env.NOTION_API_KEY
  },
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/train",
        permanent: false,
      },
      {
        source: "/home",
        destination: "/train",
        permanent: false,
      },
    ];
  },
};
