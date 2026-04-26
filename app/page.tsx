"use client";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 w-full h-full">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-387.5 w-full grid grid-cols-1 lg:grid-cols-3 gap-12 tasa-orbiter-display">
          
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <h1 className="tasa-orbiter-display text-6xl md:text-7xl text-black tracking-tight">
                Dockerguard
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Your only way to be <span className="font-semibold text-black">vulnerability free</span> from Docker images.
                Secure, scan, and deploy with confidence.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:cursor-pointer hover:bg-gray-900 transition-colors duration-200">
                Sign In
              </button>
              <button className="px-8 py-3 bg-gray-100 text-black font-medium rounded-lg hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 border border-gray-300">
                Sign Up
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <p className="text-3xl font-bold text-black">10K+</p>
                <p className="text-sm text-gray-600 mt-2">Images Scanned</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <p className="text-3xl font-bold text-black">99.9%</p>
                <p className="text-sm text-gray-600 mt-2">Accuracy Rate</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <p className="text-3xl font-bold text-black">&lt;1sec</p>
                <p className="text-sm text-gray-600 mt-2">Scan Time</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-black text-lg mb-2">Vulnerability Scanning</h3>
                <p className="text-sm text-gray-600">Comprehensive analysis of Docker images for security threats</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-black text-lg mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-gray-600">Continuous protection against new vulnerabilities</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-black text-lg mb-2">Compliance Reports</h3>
                <p className="text-sm text-gray-600">Detailed audit trails and compliance documentation</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-black text-lg mb-2">API Integration</h3>
                <p className="text-sm text-gray-600">Seamless integration with your existing CI/CD pipeline</p>
              </div>
            </div>

            {/* AI Summary Section */}
            <div className="border border-gray-200 rounded-lg p-8 bg-gradient-to-br from-gray-50 to-white pt-12">
              <div className="space-y-4">
                <h2 className="tasa-orbiter-heading text-3xl text-black">AI-Powered Summaries</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our advanced AI engine automatically analyzes vulnerability reports and generates intelligent, 
                  <span className="font-semibold text-black"> easy-to-understand summaries</span>. No more sifting through complex technical reports.
                </p>
                <ul className="space-y-3 pt-4">
                  <li className="flex items-start gap-3">
                    <span className="text-black font-bold text-xl mt-1">→</span>
                    <div>
                      <p className="font-semibold text-black">Instant Insights</p>
                      <p className="text-sm text-gray-600">Get actionable recommendations at a glance</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-black font-bold text-xl mt-1">→</span>
                    <div>
                      <p className="font-semibold text-black">Contextual Analysis</p>
                      <p className="text-sm text-gray-600">Understand the impact and severity in your environment</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-black font-bold text-xl mt-1">→</span>
                    <div>
                      <p className="font-semibold text-black">Remediation Steps</p>
                      <p className="text-sm text-gray-600">Get step-by-step guidance to fix vulnerabilities</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section - Recent Breakages */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 sticky top-8 h-fit">
              <h2 className="text-xl font-bold text-black mb-6">Recent Breakages</h2>
              
              <div className="space-y-4">
                {/* Breakage Item 1 */}
                <div className="border-l-4 border-red-500 pl-4 py-3 bg-white rounded p-3">
                  <p className="font-semibold text-black text-sm">OpenSSL Vulnerability</p>
                  <p className="text-xs text-gray-600 mt-1">CVE-2024-0567</p>
                  <p className="text-xs text-red-600 font-medium mt-2">Critical</p>
                </div>

                {/* Breakage Item 2 */}
                <div className="border-l-4 border-orange-500 pl-4 py-3 bg-white rounded p-3">
                  <p className="font-semibold text-black text-sm">Log4j Exposure</p>
                  <p className="text-xs text-gray-600 mt-1">CVE-2024-0891</p>
                  <p className="text-xs text-orange-600 font-medium mt-2">High</p>
                </div>

                {/* Breakage Item 3 */}
                <div className="border-l-4 border-orange-500 pl-4 py-3 bg-white rounded p-3">
                  <p className="font-semibold text-black text-sm">Node Package Issue</p>
                  <p className="text-xs text-gray-600 mt-1">npm-package-v3.2.1</p>
                  <p className="text-xs text-orange-600 font-medium mt-2">High</p>
                </div>

                {/* Breakage Item 4 */}
                <div className="border-l-4 border-yellow-500 pl-4 py-3 bg-white rounded p-3">
                  <p className="font-semibold text-black text-sm">Outdated Python Module</p>
                  <p className="text-xs text-gray-600 mt-1">requests-2.26.0</p>
                  <p className="text-xs text-yellow-600 font-medium mt-2">Medium</p>
                </div>

                {/* Breakage Item 5 */}
                <div className="border-l-4 border-yellow-500 pl-4 py-3 bg-white rounded p-3">
                  <p className="font-semibold text-black text-sm">Dependency Conflict</p>
                  <p className="text-xs text-gray-600 mt-1">zlib-1.2.11</p>
                  <p className="text-xs text-yellow-600 font-medium mt-2">Medium</p>
                </div>
              </div>

              <button className="w-full mt-6 py-2 border border-gray-300 text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                View All Issues
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
 