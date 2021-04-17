# smp-sstinc-org: SST Inc Management Platform (SMP)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## About

The SST Inc Management Platform is an open-sourced, unified platform for SST Inc managerial and educational matters.

## Features

### URL Shortener

A custom URL shortener and portal for SST Inc ExCo and users' convenience, without restrictions of a third-party service.

- For SST Inc ExCo/BOD only.
- Go to [smp.sstinc.org](https://smp.sstinc.org) or (Beta June 2020: [smp-sstinc-org.vercel.com](smp-sstinc-org.vercel.com)).
- Sign in with Google using your SST Google Account.
- Create a new shortened link, filling in a Title, Long Link, and New Link.
- Share the new shortened link.

### Attendance Taker

By simply entering a dynamic 4-digit code (or static QR Code), SST Inc students can independently take their own attendance swiftly without much hassle.

## Development

- Clone (or download) the project from GitHub.
- Create a new Firebase project (console.firebase.google.com).
- Create a `.env.local` file.
- Set `GOOGLE_API_KEY='YOUR_API_KEY'`.
- Run the project with `npm run dev` via CLI.

## License

This open sourced repository is licensed under the GNU General Public License v3.0.

## Credits

Made with :heart: by [Ryan The](https://ryanthe.com/) @theboi using Next.js, React and TypeScript.