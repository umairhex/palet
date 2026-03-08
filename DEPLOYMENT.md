# Deployment Guide - Palet

## Vercel Deployment Setup

### Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Supabase project

### Step 1: Configure Environment Variables on Vercel

After connecting your repository to Vercel, add the following environment variables in your project settings:

**Go to:** Project Settings → Environment Variables

Add these variables for all environments (Production, Preview, Development):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
BASE_URL=https://your-domain.com
```

**Where to find these values:**

- **VITE_SUPABASE_URL**: Supabase Dashboard → Project Settings → API → Project URL
- **VITE_SUPABASE_ANON_KEY**: Supabase Dashboard → Project Settings → API → anon/public key
- **BASE_URL**: Your deployed domain (e.g., https://palet.umairrx.dev)

### Step 2: Configure Supabase OAuth Redirects

Your Supabase project must have the correct redirect URLs configured:

1. Go to: Supabase Dashboard → Authentication → URL Configuration
2. Add these URLs under **Redirect URLs**:
   ```
   https://your-domain.com/
   https://your-domain.com/auth/callback
   ```
3. Set the **Site URL** to: `https://your-domain.com`

### Step 3: Deploy

Once environment variables are set:

1. Push your code to GitHub
2. Vercel will automatically detect changes and deploy
3. Or manually trigger a deployment from Vercel Dashboard

### Troubleshooting

**Error: "OAuth callback - 404 NOT_FOUND"**

- Verify redirect URLs are correctly configured in Supabase
- Wait 2-3 minutes for Supabase settings to propagate
- Check that auth token is present in URL hash

**Authentication not working**

- Check environment variables are set in Vercel project
- Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
- Clear browser cache and try again
- Check browser console for errors

**Build fails**

- Ensure all dependencies are installed: `pnpm install`
- Check TypeScript errors: `pnpm type-check`
- Verify no linting issues: `pnpm lint`

## Local Development

For local testing, create a `.env.local` file with your values:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
BASE_URL=http://localhost:5173
```

Then run:

```bash
pnpm install
pnpm dev
```

## Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] Supabase OAuth redirect URLs added
- [ ] Custom domain configured in Vercel
- [ ] SSL certificate enabled (automatic)
- [ ] SEO validation passing: `pnpm validate-seo`
- [ ] All tests passing: `pnpm type-check`
- [ ] No console errors in production

## Database & Auth

The application uses Supabase for:

- Authentication (OAuth with Google)
- Real-time database (color palettes, fonts)
- File storage (font uploads)
- Row-level security policies

Make sure your Supabase project has:

- Tables created and migrated
- RLS policies configured
- Storage buckets created
- Auth providers configured (Google OAuth)

For initial setup, run migrations:

```bash
pnpm supabase migrate up
```
