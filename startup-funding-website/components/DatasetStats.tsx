interface DatasetStatsProps {
  stats: {
    total_records: number
    features_used: number
    training_samples: number
    testing_samples: number
  }
}

export default function DatasetStats({ stats }: DatasetStatsProps) {
  const statCards = [
    {
      label: 'Total Records',
      value: stats.total_records.toLocaleString(),
      icon: '📊',
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Features Used',
      value: stats.features_used.toLocaleString(),
      icon: '🔢',
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Training Samples',
      value: stats.training_samples.toLocaleString(),
      icon: '🎯',
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Testing Samples',
      value: stats.testing_samples.toLocaleString(),
      icon: '✅',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
        Dataset Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{card.icon}</span>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${card.color} opacity-20`}></div>
            </div>
            <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
              {card.value}
            </div>
            <div className="text-gray-600 font-medium">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
