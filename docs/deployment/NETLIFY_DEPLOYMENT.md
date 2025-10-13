# 🚀 Netlify Deployment Guide

**Platform:** Netlify  
**Advantages:** Instant deployments, atomic updates, automatic HTTPS, no CDN caching issues

---

## 🎯 Quick Start (5 Minutes)

### Step 1: Sign Up / Login to Netlify

1. Go to: https://app.netlify.com/signup
2. Sign up with GitHub account (recommended)
3. Authorize Netlify to access your GitHub repositories

---

### Step 2: Create New Site

**Option A: Via Netlify Dashboard (Recommended)**

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select repository: **`karnisinghji/staff`**
4. Configure build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. Click **"Deploy site"**

**Option B: Via Netlify CLI**

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site (run from project root)
cd /path/to/staff
netlify init

# Follow prompts:
# - Create & configure a new site
# - Team: [Your team]
# - Site name: staff-contractor-platform (or custom)
# - Build command: npm run build
# - Directory: frontend/dist
```

---

### Step 3: Configure Build Settings

In Netlify dashboard → **Site settings** → **Build & deploy**:

**Build settings:**
```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

**Environment variables:**
(None required - all URLs are in code)

**Node version:** (auto-detected from netlify.toml)
```
NODE_VERSION = 20
```

---

### Step 4: Deploy!

**Automatic deployments:**
- Every push to `main` branch triggers automatic deployment
- Pull requests create deploy previews
- Branch deploys available for feature branches

**Manual deployment:**
```bash
# From project root
netlify deploy --prod

# Or build locally first
cd frontend
npm run build
cd ..
netlify deploy --prod --dir=frontend/dist
```

---

## 📊 Features Enabled

### ✅ Automatic Benefits:

1. **Instant Cache Invalidation**
   - Every deploy gets new content immediately
   - No more GitHub Pages CDN delays
   - Build stamp still works but not strictly needed

2. **Atomic Deployments**
   - All files update simultaneously
   - No partial deploys or stale assets
   - Rollback to any previous deploy instantly

3. **Deploy Previews**
   - Every PR gets its own URL
   - Test changes before merging
   - Share preview links with team

4. **Custom Domain (Optional)**
   - Free SSL certificate
   - Automatic HTTPS redirect
   - Custom subdomain: `staff.yourdomain.com`

5. **Forms & Functions (Bonus)**
   - Can add serverless functions if needed
   - Form handling without backend
   - Analytics included

---

## 🔧 Configuration Files

### `netlify.toml` (Root directory)

```toml
[build]
  base = "frontend/"
  publish = "dist/"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "20"
  NODE_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### `frontend/public/_redirects`

```
/*    /index.html   200
```

This handles SPA routing - all routes return `index.html` and React Router handles the rest.

---

## 🎨 Custom Domain Setup (Optional)

### Add Custom Domain:

1. Netlify dashboard → **Domain settings** → **Add custom domain**
2. Enter domain: `staff.yourdomain.com`
3. Update DNS records (Netlify provides instructions):
   ```
   Type: CNAME
   Name: staff
   Value: [your-site].netlify.app
   ```
4. Wait for DNS propagation (5-30 minutes)
5. Netlify automatically provisions SSL certificate

### Or Use Netlify Subdomain:
- Default: `[random-name].netlify.app`
- Customize: Site settings → Change site name → `staff-platform.netlify.app`

---

## 🔍 Monitoring & Debugging

### Deploy Logs:

View in Netlify dashboard:
- **Deploys** tab shows all deployments
- Click any deploy to see full build log
- Check for errors in build or deploy phase

### Common Issues:

**Build Fails:**
```bash
# Check build locally first
cd frontend
npm install
npm run build
```

**Assets 404:**
- Check `base` path in `vite.config.ts`
- Verify `publish` directory in netlify.toml
- Ensure `_redirects` file is in `public/` directory

**Environment Variables:**
- Add in Netlify dashboard: Site settings → Environment variables
- Prefix with `VITE_` for client-side access
- Redeploy after adding variables

---

## 📈 Performance Comparison

| Feature | GitHub Pages | Netlify |
|---------|-------------|---------|
| **Deploy Time** | 5-10 min | 1-2 min |
| **CDN Update** | 10-60 min ❌ | Instant ✅ |
| **Asset Handling** | Sometimes 404 ❌ | Always works ✅ |
| **Cache Control** | No control ❌ | Full control ✅ |
| **Rollback** | Manual ❌ | One-click ✅ |
| **Deploy Previews** | No ❌ | Yes ✅ |
| **Custom Headers** | No ❌ | Yes ✅ |
| **Build Logs** | Limited ❌ | Full access ✅ |
| **Cost** | Free ✅ | Free (300 min/mo) ✅ |

---

## 🚀 Post-Deployment Checklist

After deploying to Netlify:

- [ ] Visit Netlify URL: `https://[your-site].netlify.app`
- [ ] Check console - should see `index-B3Gyfc_R.js` or newer
- [ ] Verify no `localhost:3003` errors
- [ ] Confirm `DEMO_MODE: false` or undefined
- [ ] Test registration: Should call Railway auth service
- [ ] Test login: Should receive real JWT tokens
- [ ] Check Network tab: All assets load from Netlify CDN
- [ ] Verify SPA routing: Navigate to `/register`, `/login` (no 404)
- [ ] Test on mobile device or different browser
- [ ] Update README with Netlify URL

---

## 🔄 Migration from GitHub Pages

### Keep Both (Recommended for now):

- **GitHub Pages:** `https://karnisinghji.github.io/staff/`
- **Netlify:** `https://[your-site].netlify.app`

Users experiencing issues can use Netlify URL while GitHub Pages CDN fixes itself.

### Switch Completely:

1. Update all documentation with Netlify URL
2. Add redirect from GitHub Pages to Netlify (optional):
   ```html
   <!-- In gh-pages index.html -->
   <meta http-equiv="refresh" content="0;url=https://[your-site].netlify.app">
   ```
3. Disable GitHub Pages workflow (or keep for backup)

---

## 🛠️ Netlify CLI Commands

```bash
# Deploy to production
netlify deploy --prod

# Deploy preview
netlify deploy

# Open site in browser
netlify open:site

# View logs
netlify logs

# Check build status
netlify status

# Link local repo to Netlify site
netlify link

# List all sites
netlify sites:list

# Run build locally
netlify build

# Serve built site locally
netlify serve
```

---

## 📝 Troubleshooting

### Deploy Failed:

**Error: "Build script not found"**
```bash
# Make sure package.json has build script
cd frontend
cat package.json | grep "build"

# Should see:
# "build": "vite build"
```

**Error: "Permission denied"**
```bash
# Re-authenticate
netlify logout
netlify login
```

### Assets Not Loading:

**Check base path:**
```typescript
// vite.config.ts should detect Netlify
const base = process.env.NETLIFY ? '/' : '/staff/';
```

**Check _redirects file:**
```bash
# Should be in frontend/public/_redirects
cat frontend/public/_redirects

# Should contain:
# /*    /index.html   200
```

### SPA Routes 404:

**Verify _redirects is deployed:**
```bash
curl -I https://[your-site].netlify.app/_redirects

# Should return 200, not 404
```

---

## 🎉 Success Indicators

After successful Netlify deployment, you should see:

✅ **Build completes in 1-2 minutes**  
✅ **All assets load (no 404 errors)**  
✅ **Console shows Railway API URLs (not localhost)**  
✅ **No "Demo mode" messages**  
✅ **Real authentication works**  
✅ **SPA routing works (no 404 on refresh)**  
✅ **Updates deploy instantly (no 30-min CDN delay)**

---

## 📚 Additional Resources

- **Netlify Docs:** https://docs.netlify.com/
- **Vite + Netlify:** https://vitejs.dev/guide/static-deploy.html#netlify
- **Deploy Previews:** https://docs.netlify.com/site-deploys/deploy-previews/
- **Custom Domains:** https://docs.netlify.com/domains-https/custom-domains/
- **Serverless Functions:** https://docs.netlify.com/functions/overview/

---

## 🆘 Support

If you encounter issues:

1. Check Netlify deploy logs: Dashboard → Deploys → [Latest] → View logs
2. Verify local build works: `cd frontend && npm run build`
3. Check Netlify community: https://answers.netlify.com/
4. Netlify support: https://www.netlify.com/support/

---

**Deployment Status:** ⏳ Ready to deploy  
**Estimated Time:** 5 minutes  
**Difficulty:** Easy ⭐

**Next Step:** Go to https://app.netlify.com and click "Add new site" → "Import project" → Select your GitHub repository!
