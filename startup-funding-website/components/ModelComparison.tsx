interface ModelResult {
  Model: string
  'R² Score': number
  RMSE: number
}

interface ModelComparisonProps {
  models: ModelResult[]
  bestModel: {
    name: string
    r2_score: number
    rmse: number
  }
}

export default function ModelComparison({ models, bestModel }: ModelComparisonProps) {
  return (
    <div>
      {/* Best Model Highlight */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 mb-12 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide mb-2">🏆 Best Performing Model</div>
            <h3 className="text-4xl font-bold mb-4">{bestModel.name}</h3>
            <div className="flex gap-8 flex-wrap">
              <div>
                <div className="text-sm opacity-90">R² Score</div>
                <div className="text-3xl font-bold">{bestModel.r2_score.toFixed(4)}</div>
              </div>
              <div>
                <div className="text-sm opacity-90">RMSE</div>
                <div className="text-3xl font-bold">{bestModel.rmse.toFixed(4)}</div>
              </div>
            </div>
          </div>
          <div className="text-8xl">🎯</div>
        </div>
      </div>

      {/* All Models Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  R² Score
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  RMSE
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {models.map((model, index) => {
                const isBest = model.Model === bestModel.name
                return (
                  <tr 
                    key={index} 
                    className={`${isBest ? 'bg-green-50' : 'hover:bg-gray-50'} transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-2xl font-bold ${
                          index === 0 ? 'text-yellow-500' : 
                          index === 1 ? 'text-gray-400' : 
                          index === 2 ? 'text-amber-600' : 
                          'text-gray-300'
                        }`}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{model.Model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-blue-600">
                        {model['R² Score'].toFixed(4)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-purple-600">
                        {model.RMSE.toFixed(4)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isBest && (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Best Model
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Metrics Explanation */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="text-lg font-bold text-blue-900 mb-2">📈 R² Score</h4>
          <p className="text-sm text-gray-700">
            Coefficient of Determination (0-1). Higher values indicate better fit. 
            Shows the proportion of variance in funding amounts explained by the model.
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <h4 className="text-lg font-bold text-purple-900 mb-2">📉 RMSE</h4>
          <p className="text-sm text-gray-700">
            Root Mean Squared Error. Lower values are better. 
            Measures the average prediction error in log-transformed funding amounts.
          </p>
        </div>
      </div>
    </div>
  )
}
