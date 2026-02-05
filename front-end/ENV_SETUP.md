# Environment Variables Setup

## Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. The default `.env` uses `http://localhost:8055` for local Directus

## GitHub Pages Deployment

For GitHub Pages, you'll need to set the environment variable in your build workflow.

### Option 1: GitHub Actions Secrets

In your GitHub repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add a new repository secret:
   - Name: `VITE_API_URL`
   - Value: `https://green-careers-map-demo.fly.dev` (your production API URL)

3. In your GitHub Actions workflow file (`.github/workflows/deploy.yml`), add:
   ```yaml
   - name: Build
     env:
       VITE_API_URL: ${{ secrets.VITE_API_URL }}
     run: npm run build
   ```

### Option 2: Build Command (if using direct environment variables)

If your deployment platform supports setting environment variables directly:

```bash
VITE_API_URL=https://green-careers-map-demo.fly.dev npm run build
```

## Environment Variable Usage

The app uses `import.meta.env.VITE_API_URL` to get the API URL:
- **Development**: Falls back to `http://localhost:8055` if not set
- **Production**: Must be set to your deployed Directus backend URL

### Important Notes

- Vite only exposes environment variables prefixed with `VITE_`
- Variables are embedded at build time (not runtime)
- Don't include trailing slashes in the API URL
