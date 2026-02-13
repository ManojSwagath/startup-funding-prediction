#!/bin/bash

echo "================================================"
echo "  STARTUP FUNDING WEBSITE - DEPLOYMENT SCRIPT"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "ERROR: package.json not found!"
    echo "Please run this script from the startup-funding-website directory"
    exit 1
fi

echo "Step 1: Checking for data files..."
if [ ! -f "public/data/results.json" ]; then
    echo ""
    echo "WARNING: public/data/results.json not found!"
    echo ""
    echo "Please run the export script first:"
    echo "   cd .."
    echo "   python export_data.py"
    echo "   cd startup-funding-website"
    echo ""
    exit 1
fi
echo "  ✓ results.json found"

if [ ! -f "public/images/model_comparison.png" ]; then
    echo "  ⚠ WARNING: model_comparison.png not found"
    echo "    Run python export_data.py to generate charts"
fi

if [ ! -f "public/images/data_insights.png" ]; then
    echo "  ⚠ WARNING: data_insights.png not found"
    echo "    Run python export_data.py to generate charts"
fi

echo ""
echo "Step 2: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed"
    exit 1
fi

echo ""
echo "Step 3: Building production version..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed"
    exit 1
fi

echo ""
echo "================================================"
echo "  BUILD SUCCESSFUL!"
echo "================================================"
echo ""
echo "Your website is ready to deploy!"
echo ""
echo "DEPLOYMENT OPTIONS:"
echo ""
echo "Option 1: Deploy with Vercel CLI"
echo "   vercel"
echo ""
echo "Option 2: Deploy via GitHub"
echo "   1. Push to GitHub"
echo "   2. Connect repository to Vercel"
echo ""
echo "Option 3: Test locally"
echo "   npm run dev"
echo "   Then open http://localhost:3000"
echo ""
echo "================================================"
