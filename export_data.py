"""
Export script to generate data and visualizations from the Jupyter notebook
for the Next.js website.

Run this script after training all models in the notebook:
    python export_data.py
"""

import json
import os
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def export_results():
    """Export model results and generate visualizations."""
    
    print("="*60)
    print("EXPORTING DATA FOR WEBSITE")
    print("="*60)
    
    # Check if we're running from the notebook
    try:
        # Get variables from the notebook kernel
        # These should be available after running all notebook cells
        from IPython import get_ipython
        ipython = get_ipython()
        
        if ipython is None:
            print("⚠️  Please run this from within the Jupyter notebook environment")
            print("    or ensure all required variables are in the global scope.")
            return False
            
        # Get variables from IPython namespace
        ns = ipython.user_ns
        
        results_df = ns.get('results_df')
        best_model_name = ns.get('best_model_name')
        best_r2 = ns.get('best_r2')
        best_rmse = ns.get('best_rmse')
        df = ns.get('df')
        X_train = ns.get('X_train')
        X_test = ns.get('X_test')
        X = ns.get('X')
        
    except ImportError:
        print("⚠️  Not running in Jupyter environment")
        print("    Please run the notebook cells first, then run this script.")
        return False
    
    # Validate required variables exist
    if any(v is None for v in [results_df, best_model_name, best_r2, best_rmse, df, X_train, X_test, X]):
        print("❌ Error: Required variables not found!")
        print("   Please run all notebook cells first to train the models.")
        return False
    
    # Create directory structure
    base_dir = 'startup-funding-website'
    os.makedirs(f'{base_dir}/public/data', exist_ok=True)
    os.makedirs(f'{base_dir}/public/images', exist_ok=True)
    
    print("\n📁 Creating directories...")
    print(f"   ✓ {base_dir}/public/data")
    print(f"   ✓ {base_dir}/public/images")
    
    # Export results JSON
    print("\n📊 Exporting model results...")
    results_json = {
        "models": results_df.to_dict('records'),
        "best_model": {
            "name": str(best_model_name),
            "r2_score": float(best_r2),
            "rmse": float(best_rmse)
        },
        "dataset_stats": {
            "total_records": int(df.shape[0]),
            "features_used": int(X.shape[1]),
            "training_samples": int(X_train.shape[0]),
            "testing_samples": int(X_test.shape[0])
        }
    }
    
    with open(f'{base_dir}/public/data/results.json', 'w') as f:
        json.dump(results_json, f, indent=2)
    print("   ✓ results.json")
    
    # Generate model comparison chart
    print("\n📈 Generating visualizations...")
    fig, axes = plt.subplots(1, 2, figsize=(15, 5))
    
    # R² Score comparison
    axes[0].barh(results_df['Model'], results_df['R² Score'], color='#60a5fa', edgecolor='#1e40af')
    axes[0].set_xlabel('R² Score', fontsize=12, fontweight='bold')
    axes[0].set_title('Model Comparison: R² Score (Higher is Better)', fontsize=14, fontweight='bold')
    axes[0].grid(axis='x', alpha=0.3)
    for i, v in enumerate(results_df['R² Score']):
        axes[0].text(v + 0.01, i, f'{v:.4f}', va='center', fontweight='bold')
    
    # RMSE comparison
    axes[1].barh(results_df['Model'], results_df['RMSE'], color='#f87171', edgecolor='#991b1b')
    axes[1].set_xlabel('RMSE', fontsize=12, fontweight='bold')
    axes[1].set_title('Model Comparison: RMSE (Lower is Better)', fontsize=14, fontweight='bold')
    axes[1].grid(axis='x', alpha=0.3)
    for i, v in enumerate(results_df['RMSE']):
        axes[1].text(v + 0.01, i, f'{v:.4f}', va='center', fontweight='bold')
    
    plt.tight_layout()
    plt.savefig(f'{base_dir}/public/images/model_comparison.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("   ✓ model_comparison.png")
    
    # Generate data insights visualization
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    
    # 1. Top 10 Industries by Average Funding
    top_industries = df.groupby('Industry Vertical')['Amount in USD'].mean().nlargest(10).sort_values()
    axes[0, 0].barh(range(len(top_industries)), top_industries.values, color='#34d399')
    axes[0, 0].set_yticks(range(len(top_industries)))
    axes[0, 0].set_yticklabels(top_industries.index, fontsize=9)
    axes[0, 0].set_xlabel('Average Funding (USD)', fontsize=10, fontweight='bold')
    axes[0, 0].set_title('Top 10 Industries by Average Funding', fontsize=12, fontweight='bold')
    axes[0, 0].grid(axis='x', alpha=0.3)
    
    # 2. Investment Type Distribution
    investment_counts = df['InvestmentnType'].value_counts().head(10)
    axes[0, 1].bar(range(len(investment_counts)), investment_counts.values, color='#a78bfa')
    axes[0, 1].set_xticks(range(len(investment_counts)))
    axes[0, 1].set_xticklabels(investment_counts.index, rotation=45, ha='right', fontsize=9)
    axes[0, 1].set_ylabel('Count', fontsize=10, fontweight='bold')
    axes[0, 1].set_title('Top 10 Investment Types', fontsize=12, fontweight='bold')
    axes[0, 1].grid(axis='y', alpha=0.3)
    
    # 3. Top 10 Cities by Number of Startups
    top_cities = df['City  Location'].value_counts().head(10)
    axes[1, 0].barh(range(len(top_cities)), top_cities.values, color='#fbbf24')
    axes[1, 0].set_yticks(range(len(top_cities)))
    axes[1, 0].set_yticklabels(top_cities.index, fontsize=9)
    axes[1, 0].set_xlabel('Number of Startups', fontsize=10, fontweight='bold')
    axes[1, 0].set_title('Top 10 Cities by Startup Count', fontsize=12, fontweight='bold')
    axes[1, 0].grid(axis='x', alpha=0.3)
    
    # 4. Funding Amount Distribution
    axes[1, 1].hist(df['Amount in USD'].dropna(), bins=50, color='#f472b6', edgecolor='black', alpha=0.7)
    axes[1, 1].set_xlabel('Funding Amount (USD)', fontsize=10, fontweight='bold')
    axes[1, 1].set_ylabel('Frequency', fontsize=10, fontweight='bold')
    axes[1, 1].set_title('Distribution of Funding Amounts', fontsize=12, fontweight='bold')
    axes[1, 1].set_yscale('log')
    axes[1, 1].grid(alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(f'{base_dir}/public/images/data_insights.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("   ✓ data_insights.png")
    
    print("\n" + "="*60)
    print("✅ EXPORT COMPLETED SUCCESSFULLY!")
    print("="*60)
    print(f"\n📂 Files exported to: {base_dir}/public/")
    print("   - data/results.json")
    print("   - images/model_comparison.png")
    print("   - images/data_insights.png")
    print("\n🚀 Next steps:")
    print(f"   1. cd {base_dir}")
    print("   2. npm install")
    print("   3. npm run dev")
    print("\n   Then open http://localhost:3000 in your browser")
    print("="*60)
    
    return True

if __name__ == "__main__":
    success = export_results()
    if not success:
        sys.exit(1)
