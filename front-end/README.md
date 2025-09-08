# Front-end (Vite + React)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm installed.  
  If you use `nvm`:
  ```sh
  nvm use 18 || nvm install 18
  ```

## Quick start

1. From the repo root, go to the front-end folder:

   ```sh
   cd front-end
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the dev server (opens your browser):
   ```sh
   npm run dev
   ```
   By default the app runs at http://localhost:4000 (see `vite.config.js`).

## Other scripts

- Build for production:

  ```sh
  npm run build
  ```

- Preview the production build locally:

  ```sh
  npm run preview
  ```

- Lint the code:
  ```sh
  npm run lint
  ```

## Troubleshooting

- “npm run dev not found”: ensure you are inside the `front-end` folder **and** have run `npm install`.
- Port in use: the dev server uses port 4000. Update `server.port` in `vite.config.js` or free the port.
