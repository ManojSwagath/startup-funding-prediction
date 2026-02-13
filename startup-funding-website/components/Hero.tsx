export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
            Startup Funding
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Success Prediction
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Machine Learning analysis of 3,000+ startup funding records using advanced regression models
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-lg shadow-md px-6 py-4">
              <div className="text-3xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">ML Models</div>
            </div>
            <div className="bg-white rounded-lg shadow-md px-6 py-4">
              <div className="text-3xl font-bold text-purple-600">3,044</div>
              <div className="text-sm text-gray-600">Records</div>
            </div>
            <div className="bg-white rounded-lg shadow-md px-6 py-4">
              <div className="text-3xl font-bold text-green-600">2,164</div>
              <div className="text-sm text-gray-600">Features</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  )
}
