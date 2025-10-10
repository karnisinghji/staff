# CDN Cache Busting Strategy
**Implementation Date:** October 10, 2025  
**Purpose:** Ensure GitHub Pages CDN serves fresh builds reliably

---

## 🎯 Problem Statement

GitHub Pages CDN aggressively caches static assets:
- **`index.html`** can be cached for extended periods
- **Asset files** (JS/CSS) are cached based on filename
- **No control over** `Cache-Control` headers on GitHub Pages
- **CDN propagation** can take 10-15 minutes globally

This causes users to see old versions even after successful deployments.

---

## ✅ Solution Implemented

### 1. **Content-Hashed Asset Filenames** (Already Working)

Vite automatically generates unique filenames:
```
index-B3Gyfc_R.js  ← Build 1
index-UfRBnj2U.js  ← Build 2
index-7h2kL9pQ.js  ← Build 3
```

**Why it works:** New filename = guaranteed cache miss

---

### 2. **HTML Build Stamping** (Newly Implemented) ⭐

Every build injects unique metadata into `index.html`:

```html
<head>
<!-- 
  🏗️  Build Info:
  SHA: 05773c1c
  Branch: main
  Time: 2025-10-10T07:06:42.565Z
  Build #: 42
  Workflow: Deploy Frontend to GitHub Pages
-->
    <meta name="build-sha" content="05773c1c">
    <meta name="build-time" content="2025-10-10T07:06:42.565Z">
    <meta name="build-number" content="42">
    <meta charset="UTF-8" />
    ...
</head>
<body>
    <div id="root"></div>
    
<!-- Build: 2025-10-10T07:06:42.565Z | SHA: 05773c1c | #42 -->
</body>
```

**Why it works:** 
- `index.html` content changes on every build
- CDN detects change and serves fresh file
- Even if asset hashes don't change, HTML will

---

## 🔧 Implementation Details

### Script: `scripts/stamp-html.js`

Automatically injects:
- **Git SHA** (short commit hash)
- **Build timestamp** (ISO 8601 format)
- **Branch name**
- **GitHub Actions build number** (if available)
- **Workflow name**

### Workflow Integration

`.github/workflows/deploy-frontend.yml`:
```yaml
- name: Build
  run: yarn build --mode production

- name: Stamp HTML with build info
  run: node scripts/stamp-html.js

- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
```

**Order is critical:**
1. Build generates `dist/index.html`
2. Stamp injects metadata into `dist/index.html`
3. Deploy pushes modified `dist/` to `gh-pages` branch

---

## 📊 How It Helps

### Before Stamping:
```html
<!-- index.html is identical between builds -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="/staff/assets/index-UfRBnj2U.js"></script>
  </head>
  <body><div id="root"></div></body>
</html>
```
❌ CDN sees same file, serves cached version

### After Stamping:
```html
<!-- index.html changes on EVERY build -->
<!doctype html>
<html lang="en">
  <head>
<!-- Build: 2025-10-10T07:06:42.565Z | SHA: 05773c1c -->
    <meta charset="UTF-8" />
    <script src="/staff/assets/index-UfRBnj2U.js"></script>
  </head>
  <body><div id="root"></div>
<!-- Build: 2025-10-10T07:06:42.565Z | SHA: 05773c1c | #42 -->
</body>
</html>
```
✅ CDN detects new content, fetches fresh file

---

## 🧪 Testing

### Local Testing:
```bash
# Build frontend
cd frontend && npm run build

# Stamp HTML
cd .. && node scripts/stamp-html.js

# Verify stamp
grep "Build Info" frontend/dist/index.html
tail -5 frontend/dist/index.html
```

### Production Verification:
```bash
# Check live site
curl -s https://karnisinghji.github.io/staff/ | grep "Build:"

# Expected output:
# <!-- Build: 2025-10-10T07:06:42.565Z | SHA: 05773c1c | #42 -->

# Check meta tags
curl -s https://karnisinghji.github.io/staff/ | grep "build-sha"

# Expected output:
# <meta name="build-sha" content="05773c1c">
```

### Browser Verification:
1. Open DevTools → Network tab
2. Refresh page
3. Check `index.html` response
4. Look for build metadata in HTML

---

## 🚀 Benefits

### 1. **Reliable Cache Busting**
- HTML changes every build → CDN always fetches fresh copy
- Asset hashes change per content → automatic versioning

### 2. **Build Traceability**
- Know exactly which commit is deployed
- Track build numbers and timestamps
- Debug issues by checking deployed SHA

### 3. **No Browser Changes Required**
- Users don't need to clear cache manually
- Hard refresh works reliably
- New deploys visible within CDN propagation time (10-15 min)

### 4. **Developer Experience**
- Automatic in CI/CD pipeline
- No manual intervention needed
- Works with GitHub Pages limitations

---

## 📋 Best Practices

### ✅ Do:
- Keep using content-hashed filenames for assets
- Inject build metadata into HTML on every build
- Test locally before deploying
- Wait 10-15 minutes for global CDN propagation

### ❌ Don't:
- Rely on query strings for cache busting (`?v=123`)
- Expect instant CDN updates (<10 minutes)
- Use same HTML content across builds
- Forget to run stamp script after build

---

## 🔄 Future Enhancements (Optional)

### Option 1: Versioned Subpaths
Deploy each build to unique path:
```
/staff/r/05773c1c/index.html  ← Build 1
/staff/r/9b5b172a/index.html  ← Build 2
/staff/ → redirects to latest
```

**Pros:** Guaranteed cache miss per build  
**Cons:** More complex deployment, larger storage

### Option 2: Custom Domain with Cloudflare
Put Cloudflare in front of GitHub Pages:
- Manual cache purging
- Custom `Cache-Control` headers
- Instant updates

**Pros:** Full control over caching  
**Cons:** Requires domain + Cloudflare setup

### Option 3: Migrate to Netlify/Vercel
Hosts with built-in cache management:
- Automatic purges on deploy
- Configurable headers
- Atomic deployments

**Pros:** Better deployment experience  
**Cons:** Migration effort

---

## 📚 References

- [Vite Asset Hashing](https://vitejs.dev/guide/build.html#public-base-path)
- [GitHub Pages Caching](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#static-site-generators)
- [Cache-Control Best Practices](https://web.dev/http-cache/)
- [Stack Overflow: Cache Busting](https://stackoverflow.com/questions/9692665/cache-busting-via-params)

---

## ✅ Summary

**Problem:** GitHub Pages CDN caches `index.html`, users see old builds  
**Solution:** Inject unique build metadata into HTML on every deploy  
**Result:** Reliable cache busting without manual intervention

**Implementation Status:** ✅ Complete  
**Last Verified:** October 10, 2025  
**Deployed Build SHA:** `05773c1c`
