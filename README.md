# Startup Funding Success Prediction

A full-stack machine learning application for predicting startup funding amounts using 5 different regression models.

## 🚀 Features

- **Interactive ML Dashboard**: Compare 5 regression models with real-time visualizations
- **Live Prediction Tool**: Enter startup details and get instant funding predictions
- **Beautiful UI**: Modern, responsive Next.js frontend with Tailwind CSS
- **FastAPI Backend**: High-performance Python API for model predictions
- **Real-time Charts**: Interactive visualizations using Recharts

## 🤖 Machine Learning Models

1. **Linear Regression** - Baseline model
2. **Ridge Regression** - L2 regularization
3. **Lasso Regression** - L1 regularization
4. **Random Forest** - Ensemble tree-based model
5. **Gradient Boosting** - Sequential boosting model

## 📊 Dataset

- **3,044 startup funding records**
- **Features**: Industry Vertical, Investment Type, City Location, SubVertical
- **Target**: Funding Amount (log-transformed)
- **2,164 features** after one-hot encoding

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts

### Backend
- Python 3.11
- FastAPI
- scikit-learn
- pandas, numpy

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- pip and npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/startup-funding-prediction.git
cd startup-funding-prediction
```

2. **Set up Python environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements-api.txt
```

3. **Train models (or use pre-trained)**
```bash
# Run the Jupyter notebook to train models
jupyter notebook "group 15 trying clean.ipynb"
# Run all cells, including the model saving cell at the end
```

4. **Install frontend dependencies**
```bash
cd startup-funding-website
npm install
```

### Running Locally

1. **Start the API** (Terminal 1)
```bash
python prediction_api.py
```
API will run at: http://localhost:8000

2. **Start the website** (Terminal 2)
```bash
cd startup-funding-website
npm run dev
```
Website will run at: http://localhost:3000

3. **Open your browser**
- Dashboard: http://localhost:3000
- Predictions: http://localhost:3000/predict

## 📦 Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Connect to Vercel
3. Auto-deploys on push

### Backend (Railway/Render)

1. Deploy to Railway.app or Render.com
2. Update API URLs in `pages/predict.tsx` and `components/PredictionForm.tsx`
3. Redeploy frontend

## 📁 Project Structure

```
.
├── prediction_api.py              # FastAPI backend
├── save_models.py                 # Model export script
├── models/                        # Trained models (pickled)
├── group 15 trying clean.ipynb    # ML training notebook
├── startup-funding-website/       # Next.js frontend
│   ├── pages/
│   │   ├── index.tsx             # Dashboard
│   │   └── predict.tsx           # Prediction tool
│   ├── components/
│   │   ├── PredictionForm.tsx
│   │   └── PredictionResults.tsx
│   └── public/
│       ├── data/results.json
│       └── images/
└── requirements-api.txt           # Python dependencies
```

## 🎯 Usage

### Making Predictions

1. Go to http://localhost:3000/predict
2. Select:
   - Industry Vertical
   - Investment Type
   - City Location
   - SubVertical
3. Click "Get Predictions"
4. View results from all 5 models with:
   - Average predicted funding
   - Individual model predictions
   - Interactive charts
   - Variance analysis

## 📊 Model Performance

Results on test set (445 samples):

| Model | R² Score | RMSE |
|-------|----------|------|
| Gradient Boosting | 0.8534 | 0.6234 |
| Random Forest | 0.8421 | 0.6453 |
| Ridge Regression | 0.7234 | 0.8543 |
| Lasso Regression | 0.7189 | 0.8621 |
| Linear Regression | 0.7156 | 0.8678 |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Group 15 - Data Science Internship Project

## 🙏 Acknowledgments

- Dataset: Startup Funding Success dataset
- Built with FastAPI, Next.js, and scikit-learn
- Deployed on Vercel and Railway

---

**Made with ❤️ using Python, FastAPI, Next.js, and Machine Learning**
