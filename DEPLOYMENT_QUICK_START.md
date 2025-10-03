# 🎯 Quick Deployment Reference Card

## Your Service URLs (After Deployment)

### Backend Services (Render.com)
```
Auth:          https://staff-auth-service.onrender.com
User:          https://staff-user-service.onrender.com
Matching:      https://staff-matching-service.onrender.com
Communication: https://staff-communication-service.onrender.com
Notification:  https://staff-notification-service.onrender.com
```

### Frontend
```
Web:     https://karnisinghji.github.io/staff/
Android: Uses same backend URLs above
```

### Database
```
Neon PostgreSQL: ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech
Connection String: Already configured in backend/.env.production
```

---

## 🚀 Quick Start Commands

### 1. Commit Changes
```bash
cd /Users/shouryaveersingh/Desktop/old\ data/staff
git add .
git commit -m "Configure for Render.com deployment"
git push origin main
```

### 2. Deploy to Render.com
1. Go to https://dashboard.render.com
2. Create new Web Service
3. Follow guide: `RENDER_DEPLOYMENT_GUIDE.md`

### 3. Update & Deploy Frontend
```bash
cd frontend
npm run build
cp -r dist/* ../docs/
cd ..
git add docs/
git commit -m "Deploy frontend with Render backend URLs"
git push origin main
```

---

## 📋 Deployment Checklist

- [ ] Push code to GitHub
- [ ] Deploy Auth Service to Render
- [ ] Deploy User Service to Render  
- [ ] Deploy Matching Service to Render
- [ ] Test backend services
- [ ] Update frontend if needed
- [ ] Deploy frontend to GitHub Pages
- [ ] Test web app
- [ ] Build Android APK
- [ ] Test Android app

---

## 🔑 Environment Variables Template

For each Render service, add these env vars:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://neondb_owner:npg_AwN7nqtQOs8P@ep-proud-dew-adi1wdgd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=contractor-worker-platform-super-secret-key-2025
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://karnisinghji.github.io
ALLOWED_ORIGINS=https://karnisinghji.github.io,http://localhost:5173
```

---

## 🧪 Testing URLs

After deployment, test each service:

```bash
# Health checks
curl https://staff-auth-service.onrender.com/health
curl https://staff-user-service.onrender.com/health
curl https://staff-matching-service.onrender.com/health

# Web app
open https://karnisinghji.github.io/staff/
```

---

## ⚠️ Important Notes

1. **First Request**: Free tier services sleep after 15 min inactivity
   - First request may take 30-60 seconds
   - Normal after that

2. **CORS**: Already configured for:
   - https://karnisinghji.github.io
   - http://localhost:5173

3. **Database**: Neon PostgreSQL already set up and ready

4. **Free Tier**: 750 hours/month per service
   - Enough for 1 service 24/7
   - Or multiple services with moderate use

---

## 📞 Support

If issues:
1. Check Render logs: Dashboard → Service → Logs
2. Check browser console (F12)
3. Verify environment variables
4. Test API endpoints directly

---

## 🎉 Success Indicators

✅ All services show "Live" in Render dashboard
✅ Health endpoints return `{"status":"ok"}`
✅ Web app loads at GitHub Pages URL
✅ Can register/login successfully
✅ Profile page shows data
✅ No CORS errors in console

---

**Ready? Start with Step 1 above!** 🚀
