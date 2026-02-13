# 🚀 Interactive Prediction System - Setup Guide

## What You're Getting

An **interactive web application** where users can:
- 📝 Enter startup details (Industry, Investment Type, City, SubVertical)
- 🤖 Get real-time predictions from ALL 5 ML models
- 📊 See dynamic charts comparing model predictions
- 💰 View predicted funding amounts with variance analysis
- ⚡ All in real-time with beautiful visualizations!

## 🎯 Quick Start (3 Steps)

### Step 1: Save Your Trained Models

Add this cell to your Jupyter notebook and run it:

```python
exec(open('save_models.py').read())
save_models_from_notebook()
```

This will save all your trained models to a `models/` directory.

### Step 2: Start the Prediction API

Open a **new terminal** and run:

```bash
# Install API dependencies (first time only)
pip install fastapi uvicorn pydantic

# Start the API server
python prediction_api.py
```

You'll see:
```
🚀 Starting Startup Funding Prediction API...
📊 Server will run at: http://localhost:8000
📖 API docs at: http://localhost:8000/docs
```

**Keep this terminal running!**

### Step 3: Start the Website

Open **another terminal** and run:

```bash
cd startup-funding-website
npm run dev
```

Then open your browser to:
- **Main Dashboard**: http://localhost:3000
- **Prediction Tool**: http://localhost:3000/predict

## 🎨 What You Can Do

### On the Prediction Page:

1. **Select startup details** from dropdown menus:
   - Industry Vertical (e.g., "Technology", "E-commerce")
   - Investment Type (e.g., "Seed Funding", "Series A")
   - City Location (e.g., "Bangalore", "Mumbai")
   - SubVertical (e.g., "E-learning", "FinTech")

2. **Click "Get Predictions"** button

3. **See instant results**:
   - 💰 Average predicted funding amount
   - 📊 Interactive bar chart comparing all 5 models
   - 📋 Detailed table with each model's prediction
   - 📈 Variance analysis showing model agreement
   - 🎯 Highest and lowest predictions highlighted

## 📸 Features

### Real-Time Predictions
- Predictions happen in <1 second
- All 5 models run simultaneously
- Results update dynamically

### Interactive Charts
- Horizontal bar chart showing funding predictions
- Color-coded by model
- Hover to see exact amounts
- Automatically formatted currency

### Model Comparison
- See which models agree/disagree
- Variance analysis
- Confidence indicators
- Highest/lowest markers

### Responsive Design
- Works on desktop, tablet, mobile
- Smooth animations
- Modern gradient UI
- Loading states

## 🔧 Architecture

```
User Input (Browser)
    ↓
Next.js Frontend (Port 3000)
    ↓ HTTP POST
FastAPI Backend (Port 8000)
    ↓
Trained ML Models (Pickled)
    ↓
Predictions (All 5 models)
    ↓
JSON Response
    ↓
Real-time Charts & Display
```

## 📁 File Structure

```
Data_proces/
├── prediction_api.py           # FastAPI server
├── save_models.py              # Model saving script
├── models/                     # Saved models directory
│   ├── linear_model.pkl
│   ├── ridge_model.pkl
│   ├── lasso_model.pkl
│   ├── random_forest_model.pkl
│   ├── gradient_boosting_model.pkl
│   ├── scaler.pkl
│   ├── feature_columns.pkl
│   └── categorical_mappings.pkl
└── startup-funding-website/
    ├── pages/
    │   ├── index.tsx           # Dashboard
    │   └── predict.tsx         # Prediction page
    └── components/
        ├── PredictionForm.tsx  # Input form
        └── PredictionResults.tsx # Results display
```

## 🧪 Testing the API

You can test the API directly at: http://localhost:8000/docs

This opens an interactive API documentation where you can:
- See all endpoints
- Try predictions manually
- View request/response formats

## ⚠️ Troubleshooting

### API Not Starting
**Problem**: ModuleNotFoundError
**Solution**: 
```bash
pip install -r requirements-api.txt
```

### Models Not Found
**Problem**: "Models not loaded yet"
**Solution**: Run the save_models.py script in your notebook first

### Connection Refused
**Problem**: Website can't connect to API
**Solution**: Make sure prediction_api.py is running on port 8000

### CORS Errors
**Problem**: Cross-origin request blocked
**Solution**: API already configured for CORS, restart both servers

## 🚀 Deployment Options

### Option 1: Local Demo (Current Setup)
- Perfect for presentations and testing
- Both services run locally

### Option 2: Deploy to Cloud
- **Frontend**: Deploy to Vercel (automatic)
- **Backend**: Deploy to:
  - Railway.app (easiest for Python)
  - Render.com
  - Google Cloud Run
  - AWS Lambda

### For Production Deployment:

1. **Update API URL** in `predict.tsx`:
```typescript
const response = await fetch('https://your-api-url.com/api/predict', {
```

2. **Deploy backend** first, get URL

3. **Deploy frontend** to Vercel with updated URL

## 💡 Example Usage

1. **Select values**:
   - Industry: "Consumer Internet"
   - Investment Type: "Seed Funding"
   - City: "Bangalore"
   - SubVertical: "E-learning"

2. **Click "Get Predictions"**

3. **See results**:
   - Gradient Boosting: $2.5M
   - Random Forest: $2.3M
   - Linear Regression: $2.1M
   - Ridge Regression: $2.0M
   - Lasso Regression: $1.9M
   - Average: $2.16M

## 🎓 For Presentations

This setup is perfect for:
- Live demos
- Investor presentations
- Academic presentations
- Portfolio showcases

The real-time predictions and interactive charts make a great impression!

## 📞 Need Help?

Check these resources:
- API Documentation: http://localhost:8000/docs
- Main README: startup-funding-website/README.md
- Deployment Guide: DEPLOYMENT_GUIDE.md

---

**🎉 Enjoy your interactive prediction system!**
