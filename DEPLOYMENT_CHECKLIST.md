# Pre-Deployment Checklist

Use this checklist before deploying to Netlify.

## PWA Requirements

- [ ] Generate `icon-192.png` and `icon-512.png` (see ICON_GENERATION.md)
- [ ] Verify `manifest.json` is configured correctly
- [ ] Test service worker registration locally
- [ ] Verify offline page works (`/offline.html`)
- [ ] Test "Add to Home Screen" on mobile device

## Build Configuration

- [ ] Verify `netlify.toml` is present and configured
- [ ] Check `next.config.ts` has PWA headers
- [ ] Verify `package.json` has correct build script
- [ ] Test build locally: `npm run build`

## Code Quality

- [ ] Run linter: `npm run lint`
- [ ] Fix any TypeScript errors
- [ ] Test all critical user flows
- [ ] Verify responsive design on mobile/tablet/desktop

## Content & Assets

- [ ] Replace placeholder icons with actual app icons
- [ ] Update app name and description in manifest.json
- [ ] Verify all images/assets are optimized
- [ ] Check favicon is set

## Security

- [ ] Review security headers in `netlify.toml`
- [ ] Ensure sensitive data is in environment variables (not committed)
- [ ] Verify HTTPS is enabled (auto-enabled by Netlify)
- [ ] Check API endpoints use HTTPS

## Performance

- [ ] Test page load speed
- [ ] Verify images are optimized
- [ ] Check bundle size
- [ ] Test offline functionality

## Browser Compatibility

- [ ] Test on Chrome/Edge (Chromium)
- [ ] Test on Safari (iOS)
- [ ] Test on Firefox
- [ ] Test PWA features on mobile devices

## Features Verification

### Stockist Features
- [ ] Login/Authentication
- [ ] Dashboard loads correctly
- [ ] Orders page works
- [ ] Products page works
- [ ] Quick Order flow
- [ ] Bottom navigation (mobile)

### Pharmacy Features
- [ ] Login/Authentication
- [ ] Dashboard loads correctly
- [ ] Order placement works
- [ ] Cart functionality
- [ ] Prescription upload
- [ ] Bottom navigation (mobile)

## Post-Deployment Tests

- [ ] Visit deployed site
- [ ] Test PWA installation
- [ ] Verify service worker is active
- [ ] Test offline mode
- [ ] Check all routes work correctly
- [ ] Verify API calls (if any) work
- [ ] Test on mobile device

## Documentation

- [ ] Update README.md with deployment info
- [ ] Document environment variables needed
- [ ] Update API documentation (if applicable)

## Monitoring

- [ ] Set up Netlify Analytics (optional)
- [ ] Configure error tracking (optional)
- [ ] Set up uptime monitoring (optional)

---

**Ready to Deploy?** ✅

Once all items are checked, proceed with deployment following NETLIFY_DEPLOYMENT.md

