import Head from 'next/head'
import { useState, useEffect } from 'react'
import ModelComparison from '@/components/ModelComparison'
import DatasetStats from '@/components/DatasetStats'
import Hero from '@/components/Hero'
import Methodology from '@/components/Methodology'

interface ModelResult {
  Model: string
  'R² Score': number
  RMSE: number
}

interface ResultsData {
  models: ModelResult[]
  best_model: {
    name: string
    r2_score: number
    rmse: number
  }
  dataset_stats: {
    total_records: number
    features_used: number
    training_samples: number
    testing_samples: number
  }
}

export default function Home() {
  const [results, setResults] = useState<ResultsData | null>(null)

  useEffect(() => {
    // Load results data
    fetch('/data/results.json')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error('Error loading results:', err))
  }, [])

  return (
    <>
      <Head>
        <title>Startup Funding Success Prediction | ML Analysis Dashboard</title>
        <meta name="description" content="Machine Learning analysis of startup funding predictions using 5 regression models" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Startup Funding Analysis
              </h1>
              <div className="flex gap-6">
                <a href="#overview" className="text-gray-700 hover:text-blue-600 transition">Overview</a>
                <a href="#models" className="text-gray-700 hover:text-blue-600 transition">Models</a>
                <a href="#methodology" className="text-gray-700 hover:text-blue-600 transition">Methodology</a>
                <a href="/predict" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition font-semibold">
                  Try Predictor
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <Hero />

        {/* Dataset Stats */}
        <section id="overview" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {results && <DatasetStats stats={results.dataset_stats} />}
          </div>
        </section>

        {/* Model Results */}
        <section id="models" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
              Model Performance
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              We trained and evaluated 5 different regression models on log-transformed funding amounts
            </p>
            {results && (
              <>
                <ModelComparison models={results.models} bestModel={results.best_model} />
                
                {/* Model Comparison Charts */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Visual Comparison</h3>
                  <img 
                    src="/images/model_comparison.png" 
                    alt="Model Comparison Charts"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>

                {/* Data Insights */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Data Insights</h3>
                  <img 
                    src="/images/data_insights.png" 
                    alt="Data Insights"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </>
            )}
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Methodology />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2026 Startup Funding Analysis. Built with Next.js and deployed on Vercel.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
