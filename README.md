# 🚀 Startup Funding Prediction ML System

An interactive machine learning application that predicts startup funding amounts using 5 different regression models. Built with Python, scikit-learn, and Streamlit.

**Live Demo:** [Deploy to Streamlit Cloud](https://share.streamlit.io/)

[![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.31-red?style=flat-square&logo=streamlit)](https://streamlit.io/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3-orange?style=flat-square)](https://scikit-learn.org/)

---

## 📊 Project Overview

This project analyzes startup funding data from the Indian startup ecosystem and uses machine learning to predict funding amounts based on:
- **Industry Vertical** (280+ industries)
- **Sub-Vertical** (1,400+ specialized categories)  
- **City Location** (200+ cities)
- **Investment Type** (30+ funding rounds)

### Dataset
- **3,044 startups** analyzed
- **2,164 features** after one-hot encoding
- **5 ML models** trained and compared

---

## 🎯 ML Models & Performance

| Model | R² Score | RMSE | Performance |
|-------|----------|------|-------------|
| **Gradient Boosting** | **0.9614** | **0.2949** | 🏆 Best |
| Random Forest | 0.9356 | 0.3809 | 🥈 Very Good |
| Linear Regression | 0.8492 | 0.5834 | ✅ Good |
| Ridge Regression | 0.8485 | 0.5848 | ✅ Good |
| Lasso Regression | 0.8485 | 0.5849 | ✅ Good |

**Winner:** Gradient Boosting with 96.14% accuracy!

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/ManojSwagath/startup-funding-prediction.git
cd startup-funding-prediction
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Streamlit App
```bash
streamlit run streamlit_app.py
```

Visit **http://localhost:8501** 🎉

---

## 🌐 Deploy to Cloud (FREE!)

### Streamlit Cloud (Recommended)

1. Go to https://share.streamlit.io/
2. Sign in with GitHub
3. Click **"New app"**
4. Enter:
   - Repository: `ManojSwagath/startup-funding-prediction`
   - Branch: `main`
   - Main file: `streamlit_app.py`
5. Click **"Deploy!"**

Your app will be live in 1-2 minutes at `https://[your-app-name].streamlit.app`

See [STREAMLIT_DEPLOY.md](STREAMLIT_DEPLOY.md) for detailed instructions.

---

## 📁 Project Structure

```
startup-funding-prediction/
├── streamlit_app.py              # Main Streamlit application
├── requirements.txt              # Python dependencies
├── models/                       # Trained ML models
│   ├── linear_model.pkl
│   ├── ridge_model.pkl
│   ├── lasso_model.pkl
│   ├── random_forest_model.pkl
│   ├── gradient_boosting_model.pkl
│   ├── scaler.pkl
│   ├── feature_columns.pkl
│   └── categorical_options.json
├── group 15 trying clean.ipynb   # Training notebook
├── Startup Funding Success.csv   # Dataset
└── README.md
```

---

## ✨ Features

### 📊 Dashboard
- **Dataset Statistics** - Overview of 3,044 startups and 2,164 features
- **Model Comparison** - Interactive tables and charts comparing all 5 models
- **Performance Metrics** - R² scores and RMSE visualization
- **Best Model Analysis** - Why Gradient Boosting excels

### 🎯 Prediction Page
- **Interactive Form** - Select industry, sub-vertical, city, and investment type
- **Real-time Predictions** - Get funding predictions from all 5 models instantly
- **Visual Comparisons** - Beautiful Plotly bar charts
- **Statistics** - Mean, median, min, max, and variance analysis
- **Smart Recommendation** - Highlighted best prediction from Gradient Boosting

---

## 🔧 Data Preprocessing

1. **Log Transformation** - Applied to funding amounts for better distribution
2. **One-Hot Encoding** - Categorical variables converted to binary features
3. **Feature Alignment** - All models use consistent 2,164-feature input
4. **Standard Scaling** - Applied for Ridge and Lasso regression models
5. **Train/Test Split** - 80/20 split for model validation

---

## 🧠 Model Training

All models are trained in the Jupyter notebook: [`group 15 trying clean.ipynb`](group%2015%20trying%20clean.ipynb)

**Training Process:**
1. Load and clean dataset (3,044 records)
2. Preprocess features (log transform, encoding, scaling)
3. Train 5 regression models
4. Evaluate performance (R², RMSE)
5. Save models as pickle files

**Models Used:**
- Linear Regression
- Ridge Regression
- Lasso Regression  
- Random Forest Regressor
- Gradient Boosting Regressor

---

## 📦 Dependencies

- **streamlit** - Web application framework
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **scikit-learn** - Machine learning models
- **plotly** - Interactive visualizations

See [requirements.txt](requirements.txt) for exact versions.

---

## 🎨 Screenshots

### Dashboard
- Model performance comparison with interactive charts
- Dataset statistics and preprocessing details
- Best model analysis with metrics

### Prediction Page
- Dropdown selectors populated with real data options
- Real-time predictions from all 5 models
- Interactive bar chart visualization
- Prediction statistics and variance analysis

---

## 📈 Use Cases

- **Startup Founders** - Estimate potential funding amounts
- **Investors** - Evaluate funding trends by industry/location
- **Researchers** - Study startup ecosystem patterns
- **Students** - Learn ML model comparison and deployment

---

## 🛠️ Technologies

- **Python 3.11** - Core programming language
- **Streamlit** - Web framework for ML apps
- **scikit-learn** - ML algorithms and preprocessing
- **Plotly** - Interactive data visualizations
- **Pandas & NumPy** - Data processing

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👨‍💻 Author

**Manoj Swagath**

GitHub: [@ManojSwagath](https://github.com/ManojSwagath)

---

## 🙏 Acknowledgments

- Dataset: Indian Startup Ecosystem
- ML Framework: scikit-learn
- Deployment Platform: Streamlit Cloud
- Visualization: Plotly

---

## 🚀 Get Started Now!

```bash
git clone https://github.com/ManojSwagath/startup-funding-prediction.git
cd startup-funding-prediction
pip install -r requirements.txt
streamlit run streamlit_app.py
```

**Then deploy to Streamlit Cloud in 30 seconds!** 🎉

---

**⭐ Star this repo if you find it useful!**
