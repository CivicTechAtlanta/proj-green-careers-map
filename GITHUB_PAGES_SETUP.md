# GitHub Pages Deployment Setup

This project is configured to automatically deploy the frontend to GitHub Pages whenever changes are pushed to the `front-end/` directory.

## Initial Setup (One-Time)

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the changes

### 2. Set Environment Variables

The deployment needs your backend API URL:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://green-careers-map-demo.fly.dev` (your Directus backend URL)
4. Click **Add secret**

## How It Works

The workflow (`.github/workflows/deploy-frontend.yml`) will:

1. **Trigger** automatically when:
   - Code is pushed to `main` or `steve-design` branch
   - Changes are made in the `front-end/` directory
   - You can also manually trigger it from the Actions tab

2. **Build** the frontend:
   - Installs dependencies with `npm ci`
   - Builds the app with `npm run build`
   - Uses the `VITE_API_URL` secret for the API endpoint

3. **Deploy** to GitHub Pages:
   - Uploads the `dist/` folder as a Pages artifact
   - Deploys to your GitHub Pages URL

## Accessing Your Site

Once deployed, your site will be available at:
```
https://civictechatlanta.github.io/proj-green-careers-map/
```

## Manual Deployment

You can manually trigger a deployment:

1. Go to the **Actions** tab in your repository
2. Click on **Deploy Frontend to GitHub Pages**
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

## Viewing Deployment Status

- Go to the **Actions** tab to see all workflow runs
- Each push to `front-end/` will show a new workflow run
- Click on a run to see detailed logs
- Green checkmark = successful deployment
- Red X = deployment failed (check logs for errors)

## Troubleshooting

### Pages not enabled
- Error: "Pages is not enabled for this repository"
- Solution: Follow step 1 above to enable GitHub Pages

### API URL not set
- Error: API calls fail in production
- Solution: Set the `VITE_API_URL` secret as described in step 2

### 404 errors on page refresh
- Issue: Direct navigation to routes shows 404
- Solution: GitHub Pages doesn't support client-side routing by default
- The app should handle this with hash routing or a 404.html fallback

### Deployment not triggering
- Check that your changes are in the `front-end/` directory
- Check that you're pushing to `main` or `steve-design` branch
- View the Actions tab to see if the workflow ran

## Configuration Files

- `.github/workflows/deploy-frontend.yml` - GitHub Actions workflow
- `front-end/vite.config.js` - Sets `base: '/proj-green-careers-map/'` for correct asset paths
- `front-end/.env.example` - Template for environment variables
