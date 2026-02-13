# 🚀 DEPLOYMENT INSTRUCTIONS FOR YOUR STARTUP FUNDING WEBSITE

## ✅ What's Been Created

A complete Next.js website in the `startup-funding-website/` directory with:
- Modern, responsive design with Tailwind CSS
- Interactive model comparison dashboard
- Data visualization charts
- Full TypeScript implementation
- Optimized for Vercel deployment

## 📋 Quick Deploy (3 Steps)

### Step 1: Export Your Notebook Data

You need to export the model results from your Jupyter notebook. Add this cell at the end of your notebook and run it:

```python
import json
import os
import matplotlib.pyplot as plt

# Create directories
os.makedirs('startup-funding-website/public/data', exist_ok=True)
os.makedirs('startup-funding-website/public/images', exist_ok=True)

# Export results JSON
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

with open('startup-funding-website/public/data/results.json', 'w') as f:
    json.dump(results_json, f, indent=2)

# Save model comparison chart
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

axes[0].barh(results_df['Model'], results_df['R² Score'], color='#60a5fa', edgecolor='#1e40af')
axes[0].set_xlabel('R² Score', fontsize=12, fontweight='bold')
axes[0].set_title('Model Comparison: R² Score (Higher is Better)', fontsize=14, fontweight='bold')
axes[0].grid(axis='x', alpha=0.3)
for i, v in enumerate(results_df['R² Score']):
    axes[0].text(v + 0.01, i, f'{v:.4f}', va='center', fontweight='bold')

axes[1].barh(results_df['Model'], results_df['RMSE'], color='#f87171', edgecolor='#991b1b')
axes[1].set_xlabel('RMSE', fontsize=12, fontweight='bold')
axes[1].set_title('Model Comparison: RMSE (Lower is Better)', fontsize=14, fontweight='bold')
axes[1].grid(axis='x', alpha=0.3)
for i, v in enumerate(results_df['RMSE']):
    axes[1].text(v + 0.01, i, f'{v:.4f}', va='center', fontweight='bold')

plt.tight_layout()
plt.savefig('startup-funding-website/public/images/model_comparison.png', dpi=300, bbox_inches='tight')
plt.close()

# Save data insights
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

top_industries = df.groupby('Industry Vertical')['Amount in USD'].mean().nlargest(10).sort_values()
axes[0, 0].barh(range(len(top_industries)), top_industries.values, color='#34d399')
axes[0, 0].set_yticks(range(len(top_industries)))
axes[0, 0].set_yticklabels(top_industries.index, fontsize=9)
axes[0, 0].set_xlabel('Average Funding (USD)', fontsize=10, fontweight='bold')
axes[0, 0].set_title('Top 10 Industries by Average Funding', fontsize=12, fontweight='bold')
axes[0, 0].grid(axis='x', alpha=0.3)

investment_counts = df['InvestmentnType'].value_counts().head(10)
axes[0, 1].bar(range(len(investment_counts)), investment_counts.values, color='#a78bfa')
axes[0, 1].set_xticks(range(len(investment_counts)))
axes[0, 1].set_xticklabels(investment_counts.index, rotation=45, ha='right', fontsize=9)
axes[0, 1].set_ylabel('Count', fontsize=10, fontweight='bold')
axes[0, 1].set_title('Top 10 Investment Types', fontsize=12, fontweight='bold')
axes[0, 1].grid(axis='y', alpha=0.3)

top_cities = df['City  Location'].value_counts().head(10)
axes[1, 0].barh(range(len(top_cities)), top_cities.values, color='#fbbf24')
axes[1, 0].set_yticks(range(len(top_cities)))
axes[1, 0].set_yticklabels(top_cities.index, fontsize=9)
axes[1, 0].set_xlabel('Number of Startups', fontsize=10, fontweight='bold')
axes[1, 0].set_title('Top 10 Cities by Startup Count', fontsize=12, fontweight='bold')
axes[1, 0].grid(axis='x', alpha=0.3)

axes[1, 1].hist(df['Amount in USD'].dropna(), bins=50, color='#f472b6', edgecolor='black', alpha=0.7)
axes[1, 1].set_xlabel('Funding Amount (USD)', fontsize=10, fontweight='bold')
axes[1, 1].set_ylabel('Frequency', fontsize=10, fontweight='bold')
axes[1, 1].set_title('Distribution of Funding Amounts', fontsize=12, fontweight='bold')
axes[1, 1].set_yscale('log')
axes[1, 1].grid(alpha=0.3)

plt.tight_layout()
plt.savefig('startup-funding-website/public/images/data_insights.png', dpi=300, bbox_inches='tight')
plt.close()

print("✅ All files exported successfully!")
print("Files created:")
print("  - startup-funding-website/public/data/results.json")
print("  - startup-funding-website/public/images/model_comparison.png")
print("  - startup-funding-website/public/images/data_insights.png")
```

### Step 2: Test Locally

```bash
cd startup-funding-website
npm run dev
```

Open http://localhost:3000 in your browser to preview the website.

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Fastest)

```bash
# Install Vercel CLI (one time only)
npm install -g vercel

# Deploy
cd startup-funding-website
vercel
```

Follow the prompts. Your website will be live in seconds!

#### Option B: Using GitHub + Vercel (Recommended for continuous deployment)

1. **Create a GitHub repository** (if you haven't already)

2. **Push your code:**
```bash
cd startup-funding-website
git init
git add .
git commit -m "Initial commit: Startup funding analysis website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"
   - Done! Your website is live! 🎉

## 🎨 Website Features

Your website includes:

- **Hero Section**: Eye-catching introduction with key metrics
- **Dataset Overview**: Interactive statistics cards
- **Model Comparison**: 
  - Best model highlight
  - Detailed comparison table with rankings
  - Visual charts (R² Score & RMSE)
- **Data Insights**: Industry, city, and investment analysis
- **Methodology**: Complete explanation of your approach
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

## 📁 Important Files

- `public/data/results.json` - Model performance data (generated from notebook)
- `public/images/*.png` - Visualization charts (generated from notebook)
- `pages/index.tsx` - Main page
- `components/` - React components
- `styles/globals.css` - Global styling

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Update Content
- Edit text in `components/` files
- Modify layout in `pages/index.tsx`

## ⚠️ Troubleshooting

**Problem**: "Module not found"  
**Solution**: Run `npm install` in the startup-funding-website directory

**Problem**: Images not showing  
**Solution**: Run the export code from Step 1 in your notebook

**Problem**: Build fails  
**Solution**: Ensure results.json exists in public/data/

## 🌐 After Deployment

Your Vercel URL will look like:
`https://your-project-name.vercel.app`

You can:
- Share this URL with anyone
- Set up a custom domain in Vercel settings
- Enable automatic deployments from GitHub

## 📞 Need Help?

Check the full README.md in the startup-funding-website directory for more details.

---

**🎉 Congratulations! You've built a professional ML analysis website!**
