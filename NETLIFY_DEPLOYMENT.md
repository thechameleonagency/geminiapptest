# Netlify Deployment Guide

This guide will help you deploy Digi Swasthya to Netlify.

## Prerequisites

1. A Netlify account (sign up at https://netlify.com)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Node.js 20+ installed locally (for testing)

## Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Push your code to Git**
   ```bash
   git add .
   git commit -m "Initial commit with PWA support"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider and select your repository
   - Netlify will auto-detect Next.js settings

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next` (for Next.js 16)
   - Node version: `20` (set in Netlify UI or use `.nvmrc`)

4. **Environment Variables** (if needed)
   - Go to Site settings → Environment variables
   - Add any required API keys or secrets

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize site**
   ```bash
   netlify init
   ```
   Follow the prompts to link your site.

4. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

## Post-Deployment

### 1. Generate PWA Icons

Before deploying, make sure you have generated the PWA icons:
- Follow instructions in `ICON_GENERATION.md`
- Place `icon-192.png` and `icon-512.png` in `public/` folder

### 2. Verify PWA Features

After deployment:
- Visit your site on a mobile device
- Check if "Add to Home Screen" appears
- Test offline functionality
- Verify service worker is registered (check DevTools → Application → Service Workers)

### 3. Configure Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

## Build Configuration

The `netlify.toml` file already includes:
- Build command: `npm run build`
- Redirect rules for Next.js
- Security headers
- Cache headers for optimal performance
- Service worker configuration

## Environment Variables

If your app needs environment variables:

1. Go to Site settings → Environment variables
2. Add variables for each environment (Production, Deploy previews, Branch deploys)
3. Common variables might include:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_ENVIRONMENT`

## Continuous Deployment

Netlify automatically deploys when you push to your connected branch:
- Production branch: `main` or `master` (deploys to production)
- Other branches: Creates preview deployments

## Performance Optimization

Netlify automatically:
- Optimizes images
- Minifies JavaScript and CSS
- Enables CDN caching
- Provides HTTPS certificates

## Troubleshooting

### Build Fails

1. Check build logs in Netlify dashboard
2. Verify Node version (should be 20+)
3. Check for missing dependencies
4. Review `netlify.toml` configuration

### PWA Not Working

1. Verify manifest.json is accessible
2. Check service worker registration in DevTools
3. Ensure icons are generated and present
4. Check HTTPS is enabled (required for PWA)

### Redirects Not Working

1. Check `public/_redirects` file
2. Verify `netlify.toml` redirect rules
3. Ensure Next.js output mode is correct

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [PWA Checklist](https://web.dev/pwa-checklist/)

## Support

For issues or questions:
1. Check Netlify status: https://www.netlifystatus.com
2. Review build logs in Netlify dashboard
3. Check browser console for errors

