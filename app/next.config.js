import("dotenv").then((o) => o.config());

module.exports = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NOTION_API_KEY1: process.env.NOTION_API_KEY1,
    NOTION_API_KEY2: process.env.NOTION_API_KEY2,
    NOTION_API_KEY3: process.env.NOTION_API_KEY3,
    NOTION_API_KEY4: process.env.NOTION_API_KEY4,
    NOTION_API_KEY5: process.env.NOTION_API_KEY5,
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
