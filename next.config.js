require('dotenv').config()
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
        source: '/',
        destination: '/atd',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/atd',
        permanent: false,
      },
    ]
  },
}