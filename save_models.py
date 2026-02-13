"""
Script to save trained models from Jupyter notebook
Run this after training all models in the notebook
"""

import pickle
import os
import json

def save_models_from_notebook():
    """
    Save all trained models and preprocessing objects.
    This function should be called from within the Jupyter notebook
    after all models have been trained.
    """
    
    try:
        # Import from IPython to access notebook variables
        from IPython import get_ipython
        ipython = get_ipython()
        
        if ipython is None:
            print("⚠️  This script must be run from within the Jupyter notebook!")
            print("   Copy and paste this code into a notebook cell instead.")
            return False
        
        # Get variables from notebook namespace
        ns = ipython.user_ns
        
        # Create models directory
        os.makedirs('models', exist_ok=True)
        
        print("="*60)
        print("SAVING TRAINED MODELS")
        print("="*60)
        
        # Save individual models
        models_to_save = {
            'linear_model.pkl': ns.get('lr_model'),
            'ridge_model.pkl': ns.get('ridge_model'),
            'lasso_model.pkl': ns.get('lasso_model'),
            'random_forest_model.pkl': ns.get('rf_model'),
            'gradient_boosting_model.pkl': ns.get('gb_model')
        }
        
        for filename, model in models_to_save.items():
            if model is not None:
                with open(f'models/{filename}', 'wb') as f:
                    pickle.dump(model, f)
                print(f"✅ Saved: {filename}")
            else:
                print(f"⚠️  Warning: {filename.replace('.pkl', '')} not found in notebook")
        
        # Save scaler
        scaler = ns.get('scaler')
        if scaler is not None:
            with open('models/scaler.pkl', 'wb') as f:
                pickle.dump(scaler, f)
            print("✅ Saved: scaler.pkl")
        
        # Save feature columns
        X_train = ns.get('X_train')
        if X_train is not None:
            feature_columns = list(X_train.columns)
            with open('models/feature_columns.pkl', 'wb') as f:
                pickle.dump(feature_columns, f)
            print(f"✅ Saved: feature_columns.pkl ({len(feature_columns)} features)")
        
        # Save categorical mappings for dropdown options
        df = ns.get('df')
        if df is not None:
            categorical_mappings = {
                'industries': sorted(df['Industry Vertical'].dropna().unique().tolist()),
                'investment_types': sorted(df['InvestmentnType'].dropna().unique().tolist()),
                'cities': sorted(df['City  Location'].dropna().unique().tolist()),
                'sub_verticals': sorted(df['SubVertical'].dropna().unique().tolist())
            }
            
            with open('models/categorical_mappings.pkl', 'wb') as f:
                pickle.dump(categorical_mappings, f)
            
            # Also save as JSON for easy access
            with open('models/categorical_options.json', 'w') as f:
                json.dump(categorical_mappings, f, indent=2)
            
            print("✅ Saved: categorical_mappings.pkl")
            print(f"   - {len(categorical_mappings['industries'])} industries")
            print(f"   - {len(categorical_mappings['investment_types'])} investment types")
            print(f"   - {len(categorical_mappings['cities'])} cities")
            print(f"   - {len(categorical_mappings['sub_verticals'])} sub-verticals")
        
        print("\n" + "="*60)
        print("✅ ALL MODELS SAVED SUCCESSFULLY!")
        print("="*60)
        print("\n📂 Files saved in 'models/' directory:")
        print("   - linear_model.pkl")
        print("   - ridge_model.pkl")
        print("   - lasso_model.pkl")
        print("   - random_forest_model.pkl")
        print("   - gradient_boosting_model.pkl")
        print("   - scaler.pkl")
        print("   - feature_columns.pkl")
        print("   - categorical_mappings.pkl")
        print("   - categorical_options.json")
        print("\n🚀 Next steps:")
        print("   1. Start the API: python prediction_api.py")
        print("   2. Start the website: cd startup-funding-website && npm run dev")
        print("   3. Make predictions at: http://localhost:3000/predict")
        print("="*60)
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

# If running as script, just print instructions
if __name__ == "__main__":
    print("="*60)
    print("MODEL SAVING SCRIPT")
    print("="*60)
    print("\nThis script saves your trained models for the prediction API.")
    print("\n📝 TO USE:")
    print("   Add a new cell to your Jupyter notebook and run:")
    print("\n" + "-"*60)
    print("exec(open('save_models.py').read())")
    print("save_models_from_notebook()")
    print("-"*60)
    print("\nThis will save all models to the 'models/' directory.")
    print("="*60)
