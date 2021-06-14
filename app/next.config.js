import("dotenv").then((o) => o.config());

module.exports = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
};
