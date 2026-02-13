import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

interface Prediction {
  predictions: { [key: string]: number }
  predicted_amounts: { [key: string]: number }
  input_summary: { [key: string]: string }
}

interface PredictionResultsProps {
  prediction: Prediction
}

export default function PredictionResults({ prediction }: PredictionResultsProps) {
  // Prepare data for chart
  const chartData = Object.entries(prediction.predicted_amounts).map(([model, amount]) => ({
    model: model.replace(' Regression', '').replace(' ', '\n'),
    amount: amount,
    fullName: model
  }))

  // Sort by amount
  chartData.sort((a, b) => b.amount - a.amount)

  // Color palette
  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']

  // Find highest and lowest predictions
  const maxPrediction = Math.max(...Object.values(prediction.predicted_amounts))
  const minPrediction = Math.min(...Object.values(prediction.predicted_amounts))
  const avgPrediction = Object.values(prediction.predicted_amounts).reduce((a, b) => a + b, 0) / Object.values(prediction.predicted_amounts).length

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toFixed(0)}`
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Average Predicted Funding</h2>
        <div className="text-5xl font-extrabold mb-4">
          {formatCurrency(avgPrediction)}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="opacity-90">Highest</div>
            <div className="text-xl font-bold">{formatCurrency(maxPrediction)}</div>
          </div>
          <div>
            <div className="opacity-90">Lowest</div>
            <div className="text-xl font-bold">{formatCurrency(minPrediction)}</div>
          </div>
        </div>
      </div>

      {/* Input Summary */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Startup Profile</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {Object.entries(prediction.input_summary).map(([key, value]) => (
            <div key={key} className="border-l-4 border-blue-500 pl-3">
              <div className="text-gray-600 font-medium">{key}</div>
              <div className="text-gray-900 font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Predictions Chart */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Model Predictions Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={formatCurrency} />
            <YAxis type="category" dataKey="model" width={100} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => chartData.find(d => d.model === label)?.fullName || label}
            />
            <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Predictions Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <h3 className="text-lg font-bold text-white">Detailed Predictions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Model</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Predicted Amount</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Log Value</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chartData.map((item, index) => {
                const logValue = prediction.predictions[item.fullName]
                const isHighest = item.amount === maxPrediction
                const isLowest = item.amount === minPrediction
                
                return (
                  <tr
                    key={item.fullName}
                    className={`hover:bg-gray-50 ${isHighest ? 'bg-green-50' : isLowest ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: colors[index % colors.length] }}
                        ></div>
                        <span className="font-semibold text-gray-900">{item.fullName}</span>
                        {isHighest && <span className="ml-2 text-xs text-green-600 font-bold">HIGHEST</span>}
                        {isLowest && <span className="ml-2 text-xs text-red-600 font-bold">LOWEST</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(item.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {logValue.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.abs(logValue / 20) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">
                          {(Math.abs(logValue / 20) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Variance Analysis */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-bold text-blue-900 mb-2">📊 Variance Analysis</h4>
        <p className="text-sm text-gray-700">
          The predictions range from <strong>{formatCurrency(minPrediction)}</strong> to <strong>{formatCurrency(maxPrediction)}</strong>,
          with a variance of <strong>{formatCurrency(maxPrediction - minPrediction)}</strong> ({((maxPrediction - minPrediction) / avgPrediction * 100).toFixed(1)}% of average).
          {((maxPrediction - minPrediction) / avgPrediction * 100) < 50 
            ? ' Models show good agreement.' 
            : ' Consider gathering more specific data for better consensus.'}
        </p>
      </div>
    </div>
  )
}
