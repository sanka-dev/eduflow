# Environment Setup Guide

## Required Environment Variables

Your Next.js LMS application needs several environment variables to function properly. Follow this guide to set them up.

## 1. Sanity CMS Configuration

### Getting Your Sanity Project Details

1. **Go to Sanity.io Dashboard**
   - Visit [https://sanity.io/manage](https://sanity.io/manage)
   - Sign in to your account

2. **Find Your Project ID**
   - Select your project from the dashboard
   - Copy the Project ID from the project overview

3. **Set Your Dataset**
   - Usually `production` for live sites
   - Use `development` for testing

4. **Generate Admin Token**
   - Go to your project settings
   - Navigate to API → Tokens
   - Click "Add API token"
   - Give it a name like "LMS Admin Token"
   - Set permissions to "Editor" or "Admin"
   - Copy the generated token

### Update .env.local

Open the `.env.local` file and replace the placeholder values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def456  # Your actual project ID
NEXT_PUBLIC_SANITY_DATASET=production       # Your dataset name
SANITY_API_ADMIN_TOKEN=sk_test_abc123...    # Your admin token
```

## 2. Clerk Authentication (if using Clerk)

### Getting Clerk API Keys

1. **Go to Clerk Dashboard**
   - Visit [https://clerk.dev](https://clerk.dev)
   - Sign in to your account

2. **Get Your Keys**
   - Go to your application dashboard
   - Navigate to "API Keys"
   - Copy the Publishable Key and Secret Key

### Update .env.local

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_abc123...
CLERK_SECRET_KEY=sk_test_abc123...
```

## 3. Complete .env.local Example

Here's what your completed `.env.local` file should look like:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def456
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-30
SANITY_API_ADMIN_TOKEN=sk_test_abc123def456ghi789...

# Sanity Studio (same as above)
SANITY_STUDIO_PROJECT_ID=abc123def456
SANITY_STUDIO_DATASET=production

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_abc123def456...
CLERK_SECRET_KEY=sk_test_abc123def456...

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: Sanity Live Preview
SANITY_REVALIDATE_SECRET=your_random_secret_string
```

## 4. Verification Steps

After setting up your environment variables:

### 1. Restart Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 2. Test Sanity Connection
- Visit `http://localhost:3000/studio`
- You should see the Sanity Studio interface
- Try creating a test document

### 3. Test Application
- Visit `http://localhost:3000`
- The application should load without environment variable errors

## 5. Troubleshooting

### Common Issues

**"Missing environment variable" Error**
- Double-check all required variables are set in `.env.local`
- Ensure there are no typos in variable names
- Restart the development server

**Sanity Studio Not Loading**
- Verify your Project ID and Dataset are correct
- Check that your admin token has proper permissions
- Ensure you're using the correct API version

**Authentication Issues**
- Verify Clerk keys are correct
- Check that Clerk is properly configured for your domain

### Getting Help

1. **Sanity Issues**: Check [Sanity Documentation](https://www.sanity.io/docs)
2. **Clerk Issues**: Check [Clerk Documentation](https://clerk.dev/docs)
3. **Next.js Issues**: Check [Next.js Documentation](https://nextjs.org/docs)

## 6. Security Notes

- **Never commit `.env.local` to version control**
- **Use different tokens for development and production**
- **Regularly rotate your API tokens**
- **Use environment-specific datasets (development/production)**

## 7. Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Set the same environment variables in your hosting platform
2. Use `production` dataset for live data
3. Update `NEXT_PUBLIC_BASE_URL` to your live domain
4. Use production API tokens with appropriate permissions

---

Once you've completed this setup, your Next.js LMS application should work properly with Sanity CMS and all the enrollment features we've implemented!
