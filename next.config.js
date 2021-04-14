require('dotenv').config()
module.exports = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
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