from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import pickle
import pandas as pd
import numpy as np
from pathlib import Path

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models once
models = {}
BASE_DIR = Path(__file__).resolve().parent.parent.parent / "models"

def load_models():
    global models
    if not models:
        models['linear'] = pickle.load(open(BASE_DIR / 'linear_model.pkl', 'rb'))
        models['ridge'] = pickle.load(open(BASE_DIR / 'ridge_model.pkl', 'rb'))
        models['lasso'] = pickle.load(open(BASE_DIR / 'lasso_model.pkl', 'rb'))
        models['random_forest'] = pickle.load(open(BASE_DIR / 'random_forest_model.pkl', 'rb'))
        models['gradient_boosting'] = pickle.load(open(BASE_DIR / 'gradient_boosting_model.pkl', 'rb'))
        models['scaler'] = pickle.load(open(BASE_DIR / 'scaler.pkl', 'rb'))
        models['feature_columns'] = pickle.load(open(BASE_DIR / 'feature_columns.pkl', 'rb'))
        models['categorical_mappings'] = pickle.load(open(BASE_DIR / 'categorical_mappings.pkl', 'rb'))

@app.post("/api/predict")
async def predict(request: Request):
    load_models()
    data = await request.json()
    
    # Create DataFrame
    df = pd.DataFrame([{
        'IndustryVertical': data['industry'],
        'SubVertical': data['subVertical'],
        'CityLocation': data['city'],
        'InvestmentType': data['investmentType']
    }])
    
    # One-hot encode
    for col in ['IndustryVertical', 'SubVertical', 'CityLocation', 'InvestmentType']:
        encoded = pd.get_dummies(df[col], prefix=col)
        df = pd.concat([df, encoded], axis=1)
        df.drop(col, axis=1, inplace=True)
    
    # Align features
    for col in models['feature_columns']:
        if col not in df.columns:
            df[col] = 0
    df = df[models['feature_columns']]
    
    # Scale for Ridge/Lasso
    X_scaled = models['scaler'].transform(df)
    
    # Predictions
    predictions = {
        'linear': float(np.expm1(models['linear'].predict(df)[0])),
        'ridge': float(np.expm1(models['ridge'].predict(X_scaled)[0])),
        'lasso': float(np.expm1(models['lasso'].predict(X_scaled)[0])),
        'randomForest': float(np.expm1(models['random_forest'].predict(df)[0])),
        'gradientBoosting': float(np.expm1(models['gradient_boosting'].predict(df)[0]))
    }
    
    return predictions
