# Digi Swasthya - Healthcare Supply Chain Platform

A comprehensive Progressive Web App (PWA) connecting Stockists and Pharmacies for seamless medicine distribution, inventory management, and billing operations.

## Features

### For Stockists
- 📦 **Inventory Management** - Track products, batches, and stock levels
- 🛒 **Order Processing** - Process orders from pharmacies efficiently
- 💰 **Payment Tracking** - Monitor payments and outstanding amounts
- 📊 **Analytics** - Data-driven insights and performance metrics
- 🚀 **Quick Order** - AI-powered order processing from text/voice
- 🏥 **Pharmacy Management** - Manage pharmacy relationships

### For Pharmacies
- 🛍️ **Easy Ordering** - Order from multiple stockists quickly
- 📋 **Prescription Upload** - AI-powered prescription reading
- 💳 **Customer Billing** - Generate bills and manage payments
- 📦 **Inventory Tracking** - Monitor stock levels and expiry dates
- 🔍 **Stock Check** - Real-time stock availability
- 📊 **Sales Analytics** - Track sales and performance

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **PWA**: Service Worker, Web Manifest
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Git

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd synthetic-omega
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── (pharmacy)/        # Pharmacy role routes
│   ├── (stockist)/        # Stockist role routes
│   └── layout.tsx         # Root layout with PWA setup
├── components/
│   ├── shared/            # Shared components (BottomNav, Onboarding, MFA)
│   ├── stockist/          # Stockist-specific components
│   ├── pharmacy/          # Pharmacy-specific components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── store.ts           # Zustand state management
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
public/
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker
└── offline.html           # Offline fallback page
```

## PWA Features

### Service Worker
- Caches assets for offline access
- Provides offline fallback page
- Background sync support

### Web Manifest
- Install prompt for mobile devices
- App icons and splash screens
- Standalone display mode

### Offline Support
- Offline indicator
- Cached pages and assets
- Background data sync

## Deployment

### Deploy to Netlify

1. **Quick Deploy**
   - Push code to GitHub/GitLab/Bitbucket
   - Connect repository to Netlify
   - Netlify will auto-detect Next.js settings

2. **Manual Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. **Before Deploying**
   - Generate PWA icons (see `ICON_GENERATION.md`)
   - Review `DEPLOYMENT_CHECKLIST.md`
   - Configure environment variables if needed

See `NETLIFY_DEPLOYMENT.md` for detailed deployment instructions.

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ENVIRONMENT=development
```

### PWA Icons

Generate PWA icons before deploying:
- Follow instructions in `ICON_GENERATION.md`
- Place `icon-192.png` and `icon-512.png` in `public/` folder

## User Flow

### Entry Flow
1. Splash Screen → Role Selection
2. Login/Authentication
3. Onboarding (first-time users)
4. MFA Verification (if enabled)
5. Main Dashboard

### Stockist Flow
- Dashboard → Orders → Products → Payments → Analytics
- Quick Order → AI Processing → Review → Confirm
- Pharmacy Management → Add/Edit Pharmacies

### Pharmacy Flow
- Dashboard → Orders → Inventory → Billing → Analytics
- Quick Order → Stockist Selection → Cart → Checkout
- Prescription Upload → AI Recognition → Order Placement

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Component-based architecture

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (iOS 13+, macOS)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security

- HTTPS required for PWA features
- Secure headers configured in `netlify.toml`
- MFA support for authentication
- Input validation and sanitization

## Performance

- Optimized bundle size
- Image optimization
- Code splitting
- Lazy loading
- Service worker caching

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[Add your license here]

## Support

For issues or questions:
- Check existing issues
- Review documentation
- Contact support team

## Acknowledgments

- Built with Next.js and TypeScript
- UI components from Radix UI
- Icons from Lucide React

---

**Built with ❤️ for the healthcare industry**
