# Startup Funding Success Prediction - Website

A modern, interactive dashboard showcasing machine learning analysis of startup funding predictions. Built with Next.js and deployed on Vercel.

![Website Preview](https://img.shields.io/badge/Next.js-14.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)

## 🎯 Features

- **Interactive Dashboard**: Beautiful visualization of ML model performance
- **Model Comparison**: Side-by-side comparison of 5 regression models
- **Data Insights**: Visual analysis of startup funding patterns
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Fast Performance**: Static site generation for lightning-fast loads
- **SEO Optimized**: Meta tags and semantic HTML for better discoverability

## 📊 ML Models Analyzed

1. **Linear Regression** - Baseline model
2. **Ridge Regression** - L2 regularization
3. **Lasso Regression** - L1 regularization
4. **Random Forest** - Ensemble tree-based model
5. **Gradient Boosting** - Sequential boosting model

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Python 3.x (for data export)
- Completed Jupyter notebook with trained models

### Step 1: Export Data from Notebook

First, ensure you've run all cells in the Jupyter notebook to train the models. Then run:

```bash
python export_data.py
```

This will generate:
- `public/data/results.json` - Model performance metrics
- `public/images/model_comparison.png` - Comparison charts
- `public/images/data_insights.png` - Data visualization

### Step 2: Install Dependencies

```bash
cd startup-funding-website
npm install
```

### Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Step 4: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `out/` directory.

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd startup-funding-website
vercel
```

3. Follow the prompts to complete deployment.

### Option 2: Deploy via GitHub

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and deploy

**Note**: Make sure to run `python export_data.py` before deploying to ensure all data files are present.

## 📁 Project Structure

```
startup-funding-website/
├── components/           # React components
│   ├── Hero.tsx         # Hero section
│   ├── DatasetStats.tsx # Dataset statistics
│   ├── ModelComparison.tsx # Model results table
│   └── Methodology.tsx  # Methodology section
├── pages/               # Next.js pages
│   ├── _app.tsx        # App wrapper
│   └── index.tsx       # Main page
├── public/              # Static assets
│   ├── data/
│   │   └── results.json # Model results data
│   └── images/
│       ├── model_comparison.png
│       └── data_insights.png
├── styles/              # Global styles
│   └── globals.css
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with SSG
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

### Data Science
- **Python** - Data processing
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Scikit-learn** - Machine learning models
- **Matplotlib** - Data visualization

## 📈 Dataset Information

- **Source**: Startup Funding Success.csv
- **Records**: 3,044 startup funding entries
- **Features**: Industry Vertical, Investment Type, City Location, SubVertical
- **Target**: Funding Amount (log-transformed)
- **Split**: 80% training / 20% testing

## 🎨 Customization

### Modify Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Update Content

- Edit components in `components/` directory
- Modify main page in `pages/index.tsx`
- Update styles in `styles/globals.css`

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created as part of a startup funding analysis project.

---

**Built with ❤️ using Next.js and deployed on Vercel**
