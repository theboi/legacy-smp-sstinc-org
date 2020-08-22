# go-sstinc-org

SST Inc's URL Shortener, newly made with a GUI.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## About

An open sourced, URL Shortener Portal that makes use of firebase to store links mapped to suffixes. Newly made with a GUI for SST Inc EXCO to add links. Made with :heart: by [Ryan The](https://ryanthe.com/) @theboi using Next.js, React and TypeScript. Version 1.0 using Firebase Dynamic Links by Jia Chen.

## How It Works

- For SST Inc EXCO/BOD only.
- Go to [go.sstinc.org](https://go.sstinc.org) or (Beta June 2020: [go-sstinc-org.now.sh](https://go-sstinc-org.now.sh)).
- Sign in with Google using your SST Google Account.
- Create a new shortened link, filling in a Title, Long Link, and New Link.
- Share the new shortened link.

## Development

- Clone (or download) the project from GitHub.
- Create a new Firebase project (console.firebase.google.com).
- Create a `.env.local` file.
- Set `GOOGLE_API_KEY='YOUR_API_KEY'`.
- Run the project with `npm run dev` via CLI.

## License

This open sourced repository is licensed under the GNU General Public License v3.0.
