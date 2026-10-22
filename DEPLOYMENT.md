# 🚀 Deployment Guide — Toufikul Islam Portfolio

## ✅ Deploy Everything on Vercel (Free — Recommended)

This project is configured for **full-stack deployment on Vercel** (client + server as serverless function).

### Step 1: Push to GitHub

```bash
git add .
git commit -m "feat: complete fullstack portfolio v2.0"
git push origin main
```

### Step 2: Import on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New... → Project**
2. Select your repository `toufikul-portfolio2.0`
3. **Root Directory**: Leave as default (`./`)
4. **Framework Preset**: Other
5. **Build Command**: `npm run build` ← auto-detected from `vercel.json`
6. **Output Directory**: `client/dist` ← auto-detected from `vercel.json`
7. Click **Continue**

### Step 3: Add Environment Variables

In **Vercel Dashboard → Project → Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://...your atlas URI...` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `imranmeg2356@gmail.com` |
| `SMTP_PASS` | `iqroqjplfpumhlat` (no spaces!) |
| `NOTIFICATION_EMAIL` | `imranmeg2356@gmail.com` |
| `CLIENT_URL` | `https://your-project.vercel.app` |

> **Note**: After first deploy, you'll have a URL like `toufikul-portfolio.vercel.app`. Set `CLIENT_URL` to that URL and redeploy.

### Step 4: Deploy!

Click **Deploy** — done! Both the React frontend and the Express API will be live under one domain.

- Frontend: `https://your-project.vercel.app`
- API: `https://your-project.vercel.app/api/contact`
- Health: `https://your-project.vercel.app/api/health`

---

## 🗄️ MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Create a free **M0 Cluster**
2. **Database Access** → Create user: `toufikul_admin` with a strong password
3. **Network Access** → Add `0.0.0.0/0` (Allow from anywhere)
4. **Connect** → Drivers (Node.js) → Copy the connection string:
   ```
   mongodb+srv://toufikul_admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
5. Add this as `MONGODB_URI` in Vercel environment variables

---

## 🔧 Local Development

```bash
# Install all dependencies (run once)
npm run install:all

# Start both server + client
npm run dev

# Or start individually:
npm run dev:client   # http://localhost:3000
npm run dev:server   # http://localhost:5001
```

---

## 📨 Google App Password Setup (SMTP)

The contact form uses Gmail SMTP. To set up:

1. Enable **2-Factor Authentication** on your Google account
2. Go to **Google Account → Security → 2-Step Verification → App passwords**
3. Create an app password for "Mail"
4. Use the 16-character password **without spaces** as `SMTP_PASS`

---

## ✅ Verification After Deployment

1. Visit your Vercel URL
2. Check the boot sequence animation
3. Submit a test contact form message
4. Verify email received at `imranmeg2356@gmail.com`
5. Check health endpoint: `/api/health`
