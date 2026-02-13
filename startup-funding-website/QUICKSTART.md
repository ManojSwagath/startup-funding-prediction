# Startup Funding Analysis - Quick Start Guide

## 🚀 Setup Instructions

### 1. Export Data from Jupyter Notebook

Make sure you've run all cells in your notebook, then:

```bash
# From the Data_proces directory
python export_data.py
```

This will create the necessary data files in `startup-funding-website/public/`

### 2. Install Dependencies

```bash
cd startup-funding-website
npm install
```

### 3. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

### 4. Deploy to Vercel

```bash
npm run build
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.

## 📋 Checklist

- [ ] Ran all Jupyter notebook cells
- [ ] Executed `python export_data.py`
- [ ] Verified `public/data/results.json` exists
- [ ] Verified images in `public/images/` exist
- [ ] Installed npm dependencies
- [ ] Tested locally with `npm run dev`
- [ ] Built production version with `npm run build`
- [ ] Deployed to Vercel

## 🆘 Troubleshooting

**Problem**: Data files not found  
**Solution**: Run `python export_data.py` from the Data_proces directory

**Problem**: Module not found errors  
**Solution**: Run `npm install` in the startup-funding-website directory

**Problem**: Build fails on Vercel  
**Solution**: Ensure all files in public/ are committed to git

## 📞 Support

Check the main README.md for detailed documentation.
