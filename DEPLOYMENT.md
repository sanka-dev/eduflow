# EduFlow - Vercel Deployment Guide

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. All environment variables from `.env.local`

## Deployment Steps

### 1. Push Your Code to Git

```bash
git init
git add .
git commit -m "Initial commit - EduFlow LMS"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

### 2. Deploy on Vercel

#### Option A: Using Vercel Dashboard (Recommended for first-time)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Configure your project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install`

5. **Add Environment Variables** (Click "Environment Variables"):

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=g6981rai
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-01-30
   SANITY_API_ADMIN_TOKEN=your_sanity_admin_token
   SANITY_API_TOKEN=your_sanity_api_token
   SANITY_STUDIO_PROJECT_ID=g6981rai
   SANITY_STUDIO_DATASET=production
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   SANITY_REVALIDATE_SECRET=your_secret_here
   ```

6. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### 3. Update Clerk Settings

After deployment, you need to update your Clerk application settings:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **"Domains"** section
4. Add your Vercel domain (e.g., `your-app.vercel.app`)
5. Update **"Allowed redirect URLs"**:
   - `https://your-app.vercel.app`
   - `https://your-app.vercel.app/*`

### 4. Update Sanity CORS Settings

1. Go to [Sanity Management](https://sanity.io/manage)
2. Select your project
3. Go to **"API"** → **"CORS Origins"**
4. Add your Vercel domain:
   - Origin: `https://your-app.vercel.app`
   - Allow credentials: ✓

### 5. Update Environment Variables

After getting your Vercel URL, update:

```bash
NEXT_PUBLIC_BASE_URL=https://your-actual-vercel-url.vercel.app
```

in Vercel's Environment Variables settings.

## Custom Domain (Optional)

### Add a Custom Domain

1. In Vercel Dashboard, go to your project
2. Go to **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `eduflow.com`)
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_BASE_URL` to your custom domain
6. Update Clerk and Sanity CORS settings with your custom domain

## Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Test authentication (sign up/sign in)
- [ ] Test course browsing
- [ ] Test enrollment functionality
- [ ] Test Sanity Studio access at `/studio`
- [ ] Test lesson completion tracking
- [ ] Verify dark mode toggle works
- [ ] Test search functionality
- [ ] Check mobile responsiveness

## Troubleshooting

### Build Fails

- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Authentication Issues

- Verify Clerk domain is added
- Check Clerk publishable key and secret key
- Ensure redirect URLs are configured

### Sanity Data Not Loading

- Verify Sanity project ID and dataset
- Check CORS settings in Sanity
- Confirm API tokens are valid

### Environment Variables Not Working

- Environment variables need to be set in Vercel dashboard
- Redeploy after adding/updating environment variables
- Use `NEXT_PUBLIC_` prefix for client-side variables

## Redeployment

Push changes to your Git repository:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically redeploy your application.

## Manual Redeploy

In Vercel Dashboard:
1. Go to "Deployments"
2. Click "..." on any deployment
3. Click "Redeploy"

## PayHere Payment Integration

### Sandbox Testing (Default)

The application is configured to use PayHere sandbox for testing:
- **Merchant ID:** 1228024 (PayHere sandbox)
- **Test Cards:** Use PayHere provided test card numbers
- No real charges are made in sandbox mode

### Production Setup

1. Sign up at [PayHere](https://www.payhere.lk/)
2. Get your production merchant ID and secret
3. Update environment variables:
   ```
   NEXT_PUBLIC_PAYHERE_MERCHANT_ID=your_production_merchant_id
   PAYHERE_MERCHANT_SECRET=your_merchant_secret
   ```
4. In `components/PaymentForm.tsx`, change `sandbox: true` to `sandbox: false`

### Payment Flow

1. User clicks "Enroll Now" on a paid course
2. Redirected to payment page with course details
3. Fills payment information
4. PayHere payment gateway opens
5. After successful payment, user is enrolled automatically
6. Redirected to success page with access to course

### Important Notes

- Free courses (price = 0 or null) auto-enroll without payment
- Paid courses require PayHere payment completion
- Payment notifications are logged in `/api/payment/notify`
- Order IDs are automatically generated and tracked

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Sanity Docs: https://www.sanity.io/docs
- Clerk Docs: https://clerk.com/docs
- PayHere Docs: https://support.payhere.lk/
