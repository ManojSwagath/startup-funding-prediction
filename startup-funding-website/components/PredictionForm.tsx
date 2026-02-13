import { useState, useEffect } from 'react'

interface DropdownOptions {
  industries: string[]
  investment_types: string[]
  cities: string[]
  sub_verticals: string[]
}

interface PredictionFormProps {
  onSubmit: (data: any) => void
  loading: boolean
}

export default function PredictionForm({ onSubmit, loading }: PredictionFormProps) {
  const [options, setOptions] = useState<DropdownOptions | null>(null)
  const [formData, setFormData] = useState({
    industry_vertical: '',
    investment_type: '',
    city_location: '',
    sub_vertical: ''
  })

  useEffect(() => {
    // Fetch dropdown options from API
    fetch('http://localhost:8000/api/options')
      .then(res => res.json())
      .then(data => setOptions(data))
      .catch(err => console.error('Failed to load options:', err))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!options) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Industry Vertical */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Industry Vertical
        </label>
        <select
          value={formData.industry_vertical}
          onChange={(e) => handleChange('industry_vertical', e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="">Select Industry</option>
          {options.industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      {/* Investment Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Investment Type
        </label>
        <select
          value={formData.investment_type}
          onChange={(e) => handleChange('investment_type', e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="">Select Investment Type</option>
          {options.investment_types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* City Location */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          City Location
        </label>
        <select
          value={formData.city_location}
          onChange={(e) => handleChange('city_location', e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="">Select City</option>
          {options.cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* SubVertical */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Sub-Vertical
        </label>
        <select
          value={formData.sub_vertical}
          onChange={(e) => handleChange('sub_vertical', e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="">Select Sub-Vertical</option>
          {options.sub_verticals.map((subVertical) => (
            <option key={subVertical} value={subVertical}>
              {subVertical}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition-all transform ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Predicting...
          </span>
        ) : (
          '🚀 Get Predictions'
        )}
      </button>
    </form>
  )
}
