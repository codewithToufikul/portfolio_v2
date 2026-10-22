## 🌟 Deploying Both Frontend & Backend on Vercel (All-in-One, 100% Free)

You can deploy **BOTH the React Client and Express Backend on Vercel together**:
- **Zero Cold Start / No Sleep Time**: Unlike Render free tier, Vercel Serverless Functions execute instantly (< 200ms).
- **Single Deployment & Domain**: Everything runs under `toufikuls-portfolio.vercel.app` (both UI and `/api/contact`).
- **100% Free Forever**: Within Vercel's generous free tier limits.

### How to Deploy on Vercel in 3 Steps:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete fullstack portfolio ready for Vercel"
   git push origin main
   ```

2. **Import in Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **Add New... → Project**.
   - Select your repository `toufikul-portfolio2.0`.
   - **Root Directory**: Leave it as default (`./` - project root).
   - **Build Command**: `npm run build` (automatic).
   - **Output Directory**: `client/dist` (automatic via `vercel.json`).

3. **Add Environment Variables in Vercel Dashboard**:
   Go to **Project Settings → Environment Variables** and add:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `imranmeg2356@gmail.com`
   - `SMTP_PASS`: `iqroqjplfpumhlat`
   - `NOTIFICATION_EMAIL`: `imranmeg2356@gmail.com`
   - `MONGODB_URI`: `mongodb+srv://...` (your free MongoDB Atlas URI, or leave empty to use in-memory mode)

4. Click **Deploy**! Your entire full-stack portfolio will be live in ~60 seconds.

---

## 1. Database Setup: MongoDB Atlas (Free Tier)

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0 Cluster** in the closest region (e.g. `ap-southeast-1` Singapore or `ap-south-1` Mumbai).
3. Under **Database Access**, create a database user:
   - Username: `toufikul_admin`
   - Password: `<GENERATE_STRONG_PASSWORD>`
4. Under **Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Click **Connect** → **Drivers** (Node.js) and copy your connection string:
   ```
   mongodb+srv://toufikul_admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/toufikul-portfolio?retryWrites=true&w=majority
   ```

---

## 2. Backend Deployment: Render (or Railway)

### Option A: Render.com (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com) and click **New +** → **Web Service**.
3. Connect your repository `codewithToufikul/toufikul-portfolio2.0`.
4. Configure the service settings:
   - **Name**: `toufikul-portfolio-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   ```
   NODE_ENV=production
   PORT=5001
   MONGODB_URI=mongodb+srv://toufikul_admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/toufikul-portfolio?retryWrites=true&w=majority
   CLIENT_URL=https://toufikuls-portfolio.vercel.app
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=imranmeg2356@gmail.com
   SMTP_PASS=your_google_app_password
   NOTIFICATION_EMAIL=imranmeg2356@gmail.com
   ```
6. Click **Deploy Web Service**.
7. Note down your backend URL: `https://toufikul-portfolio-api.onrender.com`.

---

## 3. Frontend Deployment: Vercel (or Netlify)

### Option A: Vercel (Recommended)
1. Sign in to [Vercel](https://vercel.com) and click **Add New...** → **Project**.
2. Import your GitHub repository.
3. Configure the build settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click Edit and select `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Rewrites / Proxy** (to route `/api` requests to Render), ensure `client/vite.config.js` or create a `vercel.json` inside `/client`:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://toufikul-portfolio-api.onrender.com/api/:path*"
       }
     ]
   }
   ```
5. Click **Deploy**.

---

## 4. Verification & Testing

Once both services are deployed:
1. Visit your frontend URL: `https://toufikuls-portfolio.vercel.app`.
2. Verify the boot sequence and live Dhaka clock.
3. Submit a test message through the `POST /contact` form to verify end-to-end receipt in MongoDB Atlas and inbox delivery.
