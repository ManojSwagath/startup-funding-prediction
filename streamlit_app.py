import streamlit as st
import pandas as pd
import numpy as np
import pickle
import plotly.graph_objects as go
import json
from pathlib import Path

# Page config
st.set_page_config(
    page_title="Startup Funding Prediction",
    page_icon="🚀",
    layout="wide"
)

# Load models
@st.cache_resource
def load_models():
    models = {}
    base_path = Path('models')
    models['linear'] = pickle.load(open(base_path / 'linear_model.pkl', 'rb'))
    models['ridge'] = pickle.load(open(base_path / 'ridge_model.pkl', 'rb'))
    models['lasso'] = pickle.load(open(base_path / 'lasso_model.pkl', 'rb'))
    models['random_forest'] = pickle.load(open(base_path / 'random_forest_model.pkl', 'rb'))
    models['gradient_boosting'] = pickle.load(open(base_path / 'gradient_boosting_model.pkl', 'rb'))
    models['scaler'] = pickle.load(open(base_path / 'scaler.pkl', 'rb'))
    models['feature_columns'] = pickle.load(open(base_path / 'feature_columns.pkl', 'rb'))
    
    with open(base_path / 'categorical_options.json', 'r') as f:
        models['options'] = json.load(f)
    
    return models

models = load_models()

# Sidebar navigation
st.sidebar.title("🚀 Navigation")
page = st.sidebar.radio("Go to", ["Dashboard", "Make Prediction"])

# Helper function to format currency
def format_currency(amount):
    if amount >= 1_000_000:
        return f"${amount/1_000_000:.2f}M"
    elif amount >= 1_000:
        return f"${amount/1_000:.2f}K"
    else:
        return f"${amount:.2f}"

# Dashboard Page
if page == "Dashboard":
    st.title("🚀 Startup Funding Success Prediction")
    st.markdown("### Machine Learning Analysis of Indian Startup Ecosystem")
    
    # Hero section
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Startups Analyzed", "3,044")
    with col2:
        st.metric("ML Models Trained", "5")
    with col3:
        st.metric("Features Analyzed", "2,164")
    
    st.markdown("---")
    
    # Dataset Overview
    st.header("📊 Dataset Overview")
    st.markdown("""
    This project analyzes startup funding data from the Indian startup ecosystem. 
    The dataset includes information about various startups, their industry verticals, 
    locations, investment types, and funding amounts received.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        st.subheader("Key Features")
        st.markdown("""
        - **Industry Vertical**: 280+ different industries
        - **Sub-Vertical**: 1,400+ specialized categories
        - **City Location**: 200+ cities across India
        - **Investment Type**: 30+ types of funding rounds
        """)
    
    with col2:
        st.subheader("Data Preprocessing")
        st.markdown("""
        - Log transformation of funding amounts
        - One-hot encoding for categorical variables
        - Standard scaling for Ridge/Lasso models
        - Train/Test split: 80/20
        """)
    
    st.markdown("---")
    
    # Model Comparison
    st.header("🎯 Model Performance Comparison")
    
    # Model performance data
    model_data = {
        'Model': ['Linear Regression', 'Ridge Regression', 'Lasso Regression', 'Random Forest', 'Gradient Boosting'],
        'R² Score': [0.8492, 0.8485, 0.8485, 0.9356, 0.9614],
        'RMSE': [0.5834, 0.5848, 0.5849, 0.3809, 0.2949]
    }
    
    df_models = pd.DataFrame(model_data)
    
    # Display table with color coding
    st.dataframe(
        df_models.style.background_gradient(subset=['R² Score'], cmap='Greens')
                      .background_gradient(subset=['RMSE'], cmap='Reds_r')
                      .format({'R² Score': '{:.4f}', 'RMSE': '{:.4f}'}),
        use_container_width=True
    )
    
    # Bar chart
    col1, col2 = st.columns(2)
    
    with col1:
        fig_r2 = go.Figure(data=[
            go.Bar(x=model_data['Model'], y=model_data['R² Score'], 
                   marker_color=['#3b82f6', '#3b82f6', '#3b82f6', '#10b981', '#059669'])
        ])
        fig_r2.update_layout(
            title="R² Score by Model",
            yaxis_title="R² Score",
            xaxis_tickangle=-45,
            height=400
        )
        st.plotly_chart(fig_r2, use_container_width=True)
    
    with col2:
        fig_rmse = go.Figure(data=[
            go.Bar(x=model_data['Model'], y=model_data['RMSE'],
                   marker_color=['#ef4444', '#ef4444', '#ef4444', '#f97316', '#22c55e'])
        ])
        fig_rmse.update_layout(
            title="RMSE by Model",
            yaxis_title="RMSE",
            xaxis_tickangle=-45,
            height=400
        )
        st.plotly_chart(fig_rmse, use_container_width=True)
    
    st.markdown("---")
    
    # Best Model
    st.header("🏆 Best Model: Gradient Boosting")
    col1, col2 = st.columns(2)
    with col1:
        st.metric("R² Score", "0.9614", "Best performance")
        st.metric("RMSE", "0.2949", "Lowest error")
    with col2:
        st.markdown("""
        **Why Gradient Boosting excels:**
        - Captures complex non-linear relationships
        - Robust to outliers
        - Handles categorical features well
        - Sequential error correction
        """)

# Prediction Page
elif page == "Make Prediction":
    st.title("🎯 Predict Startup Funding")
    st.markdown("### Enter startup details to get funding predictions from all 5 models")
    
    # Create form
    with st.form("prediction_form"):
        col1, col2 = st.columns(2)
        
        with col1:
            industry = st.selectbox(
                "Industry Vertical",
                options=sorted(models['options']['IndustryVertical']),
                help="Select the primary industry sector"
            )
            
            city = st.selectbox(
                "City Location",
                options=sorted(models['options']['CityLocation']),
                help="Select the city where the startup is based"
            )
        
        with col2:
            sub_vertical = st.selectbox(
                "Sub-Vertical",
                options=sorted(models['options']['SubVertical']),
                help="Select the specific business category"
            )
            
            investment_type = st.selectbox(
                "Investment Type",
                options=sorted(models['options']['InvestmentType']),
                help="Select the type of funding round"
            )
        
        submitted = st.form_submit_button("🚀 Predict Funding", use_container_width=True)
    
    if submitted:
        # Create DataFrame
        input_data = pd.DataFrame([{
            'IndustryVertical': industry,
            'SubVertical': sub_vertical,
            'CityLocation': city,
            'InvestmentType': investment_type
        }])
        
        # One-hot encode
        for col in ['IndustryVertical', 'SubVertical', 'CityLocation', 'InvestmentType']:
            encoded = pd.get_dummies(input_data[col], prefix=col)
            input_data = pd.concat([input_data, encoded], axis=1)
            input_data.drop(col, axis=1, inplace=True)
        
        # Align features
        for col in models['feature_columns']:
            if col not in input_data.columns:
                input_data[col] = 0
        input_data = input_data[models['feature_columns']]
        
        # Scale for Ridge/Lasso
        X_scaled = models['scaler'].transform(input_data)
        
        # Make predictions
        predictions = {
            'Linear Regression': float(np.expm1(models['linear'].predict(input_data)[0])),
            'Ridge Regression': float(np.expm1(models['ridge'].predict(X_scaled)[0])),
            'Lasso Regression': float(np.expm1(models['lasso'].predict(X_scaled)[0])),
            'Random Forest': float(np.expm1(models['random_forest'].predict(input_data)[0])),
            'Gradient Boosting': float(np.expm1(models['gradient_boosting'].predict(input_data)[0]))
        }
        
        st.markdown("---")
        st.header("📊 Prediction Results")
        
        # Display metrics
        cols = st.columns(5)
        for idx, (model_name, amount) in enumerate(predictions.items()):
            with cols[idx]:
                st.metric(model_name, format_currency(amount))
        
        st.markdown("---")
        
        # Bar chart
        fig = go.Figure(data=[
            go.Bar(
                y=list(predictions.keys()),
                x=list(predictions.values()),
                orientation='h',
                marker=dict(
                    color=['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
                ),
                text=[format_currency(v) for v in predictions.values()],
                textposition='auto',
            )
        ])
        
        fig.update_layout(
            title="Funding Predictions by Model",
            xaxis_title="Predicted Funding Amount (USD)",
            yaxis_title="Model",
            height=400,
            showlegend=False
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        # Statistics
        st.markdown("---")
        st.header("📈 Prediction Statistics")
        
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("Average", format_currency(np.mean(list(predictions.values()))))
        with col2:
            st.metric("Median", format_currency(np.median(list(predictions.values()))))
        with col3:
            st.metric("Min", format_currency(min(predictions.values())))
        with col4:
            st.metric("Max", format_currency(max(predictions.values())))
        
        # Variance analysis
        variance = np.var(list(predictions.values()))
        st.info(f"**Prediction Variance:** {format_currency(variance)} - "
                f"{'Low variance indicates model agreement' if variance < 1000000 else 'High variance suggests diverse predictions'}")
        
        # Best prediction (Gradient Boosting)
        st.success(f"**💡 Recommended Prediction (Gradient Boosting):** {format_currency(predictions['Gradient Boosting'])}")

# Footer
st.sidebar.markdown("---")
st.sidebar.markdown("""
### 📚 About
This app uses 5 machine learning models to predict startup funding amounts based on:
- Industry sector
- Business category  
- Location
- Investment type

**Models:** Linear, Ridge, Lasso, Random Forest, Gradient Boosting

Built with Streamlit 🎈
""")
