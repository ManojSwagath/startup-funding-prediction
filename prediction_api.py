"""
FastAPI server for startup funding predictions
Serves predictions from all 5 trained models
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import pickle
import os
from typing import Dict, List

app = FastAPI(title="Startup Funding Prediction API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store models and preprocessing objects
models = {}
scaler = None
feature_columns = None
categorical_mappings = {}

class PredictionInput(BaseModel):
    industry_vertical: str
    investment_type: str
    city_location: str
    sub_vertical: str

class PredictionResponse(BaseModel):
    predictions: Dict[str, float]
    predicted_amounts: Dict[str, float]
    input_summary: Dict[str, str]

@app.on_event("startup")
async def load_models():
    """Load all trained models and preprocessing objects"""
    global models, scaler, feature_columns, categorical_mappings
    
    try:
        # Load models
        models['linear'] = pickle.load(open('models/linear_model.pkl', 'rb'))
        models['ridge'] = pickle.load(open('models/ridge_model.pkl', 'rb'))
        models['lasso'] = pickle.load(open('models/lasso_model.pkl', 'rb'))
        models['random_forest'] = pickle.load(open('models/random_forest_model.pkl', 'rb'))
        models['gradient_boosting'] = pickle.load(open('models/gradient_boosting_model.pkl', 'rb'))
        
        # Load preprocessing objects
        scaler = pickle.load(open('models/scaler.pkl', 'rb'))
        feature_columns = pickle.load(open('models/feature_columns.pkl', 'rb'))
        categorical_mappings = pickle.load(open('models/categorical_mappings.pkl', 'rb'))
        
        print("✅ All models loaded successfully!")
    except Exception as e:
        print(f"⚠️  Warning: Could not load models: {e}")
        print("    Models will be loaded from notebook variables if available")

@app.get("/")
async def root():
    """API health check"""
    return {
        "status": "running",
        "message": "Startup Funding Prediction API",
        "models_loaded": list(models.keys()),
        "version": "1.0.0"
    }

@app.get("/api/options")
async def get_options():
    """Get available options for dropdown fields"""
    if not categorical_mappings:
        raise HTTPException(status_code=503, detail="Models not loaded yet")
    
    return {
        "industries": categorical_mappings.get('industries', []),
        "investment_types": categorical_mappings.get('investment_types', []),
        "cities": categorical_mappings.get('cities', []),
        "sub_verticals": categorical_mappings.get('sub_verticals', [])
    }

@app.post("/api/predict", response_model=PredictionResponse)
async def predict(input_data: PredictionInput):
    """Make predictions using all 5 models"""
    
    if not models:
        raise HTTPException(status_code=503, detail="Models not loaded yet")
    
    try:
        # Create input dataframe
        input_dict = {
            'Industry Vertical': [input_data.industry_vertical],
            'InvestmentnType': [input_data.investment_type],
            'City  Location': [input_data.city_location],
            'SubVertical': [input_data.sub_vertical]
        }
        
        df_input = pd.DataFrame(input_dict)
        
        # One-hot encode
        df_encoded = pd.get_dummies(df_input, columns=list(input_dict.keys()), drop_first=True)
        
        # Align with training features
        for col in feature_columns:
            if col not in df_encoded.columns:
                df_encoded[col] = 0
        
        df_encoded = df_encoded[feature_columns]
        
        # Make predictions
        predictions = {}
        predicted_amounts = {}
        
        # Linear, Random Forest, Gradient Boosting (no scaling)
        X_input = df_encoded.values
        predictions['Linear Regression'] = float(models['linear'].predict(X_input)[0])
        predictions['Random Forest'] = float(models['random_forest'].predict(X_input)[0])
        predictions['Gradient Boosting'] = float(models['gradient_boosting'].predict(X_input)[0])
        
        # Ridge and Lasso (with scaling)
        X_scaled = scaler.transform(X_input)
        predictions['Ridge Regression'] = float(models['ridge'].predict(X_scaled)[0])
        predictions['Lasso Regression'] = float(models['lasso'].predict(X_scaled)[0])
        
        # Convert from log-transformed predictions back to actual amounts
        for model_name, log_pred in predictions.items():
            predicted_amounts[model_name] = float(np.expm1(log_pred))  # inverse of log1p
        
        return PredictionResponse(
            predictions=predictions,
            predicted_amounts=predicted_amounts,
            input_summary={
                "Industry": input_data.industry_vertical,
                "Investment Type": input_data.investment_type,
                "City": input_data.city_location,
                "SubVertical": input_data.sub_vertical
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/api/models")
async def get_models_info():
    """Get information about loaded models"""
    if not models:
        return {"error": "Models not loaded"}
    
    return {
        "available_models": list(models.keys()),
        "total_features": len(feature_columns) if feature_columns else 0,
        "status": "ready"
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Startup Funding Prediction API...")
    print("📊 Server will run at: http://localhost:8000")
    print("📖 API docs at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
