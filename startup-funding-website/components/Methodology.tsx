export default function Methodology() {
  const steps = [
    {
      title: '1. Data Preprocessing',
      icon: '🔧',
      items: [
        'Cleaned Amount in USD: removed commas, converted to numeric',
        'Filled missing values using startup-specific averages',
        'Standardized date formats',
        'Created log-transformed target variable (log_amount)',
        'One-hot encoded categorical features (Industry, City, Investment Type, SubVertical)',
      ]
    },
    {
      title: '2. Feature Engineering',
      icon: '⚙️',
      items: [
        'Generated 2,164 features through one-hot encoding',
        'Applied StandardScaler for regularized models',
        'Split data: 80% training (1,780 samples) / 20% testing (445 samples)',
        'Preserved original data distribution',
      ]
    },
    {
      title: '3. Model Training',
      icon: '🤖',
      items: [
        'Linear Regression: Baseline model',
        'Ridge Regression: L2 regularization to prevent overfitting',
        'Lasso Regression: L1 regularization with feature selection',
        'Random Forest: Ensemble of 100 decision trees',
        'Gradient Boosting: Sequential boosting with 100 estimators',
      ]
    },
    {
      title: '4. Evaluation & Selection',
      icon: '📊',
      items: [
        'Evaluated using R² Score (higher is better)',
        'Measured RMSE on log-transformed predictions',
        'Compared all 5 models side-by-side',
        'Selected best performer based on highest R² score',
      ]
    }
  ]

  const features = [
    { name: 'Industry Vertical', icon: '🏢', desc: 'Startup industry category' },
    { name: 'Investment Type', icon: '💰', desc: 'Type of funding round' },
    { name: 'City Location', icon: '📍', desc: 'Geographic location' },
    { name: 'SubVertical', icon: '🎯', desc: 'Industry subcategory' },
  ]

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
        Methodology
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Our systematic approach to predicting startup funding success
      </p>

      {/* Process Steps */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{step.icon}</span>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
            </div>
            <ul className="space-y-2">
              {step.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6 text-center">Key Features Used</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">{feature.icon}</div>
              <div className="font-bold mb-1">{feature.name}</div>
              <div className="text-sm opacity-90">{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Technology Stack</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'].map((tech, index) => (
            <div key={index} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-md">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
