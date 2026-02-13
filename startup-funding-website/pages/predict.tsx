import { useState, useEffect } from 'react'
import Head from 'next/head'
import PredictionForm from '@/components/PredictionForm'
import PredictionResults from '@/components/PredictionResults'

interface Prediction {
  predictions: { [key: string]: number }
  predicted_amounts: { [key: string]: number }
  input_summary: { [key: string]: string }
}

export default function PredictPage() {
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePredict = async (formData: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Prediction failed')
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError('Failed to get prediction. Make sure the API server is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Make Predictions | Startup Funding Predictor</title>
        <meta name="description" content="Get funding predictions for your startup" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Startup Funding Analysis
              </a>
              <div className="flex gap-6">
                <a href="/" className="text-gray-700 hover:text-blue-600 transition">Dashboard</a>
                <a href="/predict" className="text-blue-600 font-semibold">Predict</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Get Funding
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Predictions
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter your startup details and get instant predictions from 5 different ML models
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Prediction Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Startup Details</h2>
              <PredictionForm onSubmit={handlePredict} loading={loading} />
              
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    ⚠️ {error}
                  </p>
                  <p className="text-red-600 text-xs mt-2">
                    Make sure to run: <code className="bg-red-100 px-2 py-1 rounded">python prediction_api.py</code>
                  </p>
                </div>
              )}
            </div>

            {/* Prediction Results */}
            <div>
              {loading && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600">Analyzing your startup...</p>
                  </div>
                </div>
              )}

              {!loading && prediction && (
                <PredictionResults prediction={prediction} />
              )}

              {!loading && !prediction && !error && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Ready to Predict
                    </h3>
                    <p className="text-gray-600">
                      Fill in the form to get funding predictions from all 5 models
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold text-gray-900 mb-2">5 ML Models</h3>
              <p className="text-sm text-gray-600">
                Get predictions from Linear, Ridge, Lasso, Random Forest, and Gradient Boosting models
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Real-Time Results</h3>
              <p className="text-sm text-gray-600">
                Instant predictions with interactive visualizations and comparisons
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold text-gray-900 mb-2">Visual Insights</h3>
              <p className="text-sm text-gray-600">
                See how different models compare with dynamic charts and confidence metrics
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
