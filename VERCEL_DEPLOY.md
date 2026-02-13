# 🚀 Vercel Deployment Guide

## Quick Deploy (1 Minute!)

1. Go to https://vercel.com and sign in with GitHub
2. Click **"Add New"** → **"Project"**
3. Select **`ManojSwagath/startup-funding-prediction`**
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `startup-funding-website`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `out` (auto-detected)
5. Click **"Deploy"**

That's it! Your app will be live at `https://startup-funding-prediction.vercel.app` in 2-3 minutes! 🎉

## What's Included

✅ **Frontend:** Next.js dashboard with model comparison  
✅ **Backend:** Vercel Serverless Functions (FastAPI)  
✅ **ML Models:** All 5 trained models (Linear, Ridge, Lasso, Random Forest, Gradient Boosting)  
✅ **API Endpoints:**
   - `/api/predict` - Make predictions
   - `/api/options` - Get dropdown options (280+ industries, 1400+ sub-verticals, etc.)

## Architecture

```
startup-funding-website/
├── api/                  # Serverless API functions
│   ├── predict.py       # Prediction endpoint
│   └── options.py       # Options endpoint
├── models/              # Trained ML models (included in deployment)
├── pages/               # Next.js pages
│   ├── index.tsx        # Dashboard
│   └── predict.tsx      # Interactive predictions
├── components/          # React components
├── requirements.txt     # Python dependencies for API
└── vercel.json         # Vercel configuration
```

## Local Development

```bash
cd startup-funding-website
npm install
npm run dev
```

Visit http://localhost:3000

## Notes

- **No separate API deployment needed** - API runs as Vercel serverless functions
- **Free tier friendly** - Works perfectly on Vercel's free plan
- **Auto-scaling** - Handles traffic spikes automatically
- **Global CDN** - Fast load times worldwide
