import { GoGraph } from "react-icons/go";
import { IoMdSettings , IoIosSync } from "react-icons/io";
import { allBreakages } from "../lib/constants";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white border-red-500 p-20">
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
                dockerguard
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Your only way to be <span className="font-semibold text-black">vulnerability free</span> from Docker images.
                Secure, scan, and deploy with confidence.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="/signin" className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:cursor-pointer hover:bg-gray-900 transition-colors duration-200 text-center">
                Sign In
              </a>
              <a href="/signup" className="px-8 py-3 bg-gray-100 text-black font-medium rounded-lg hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 border border-gray-300 text-center">
                Sign Up
              </a>
            </div>

            {/* Value Propositions Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors bg-gray-50/50">
                <div className="text-3xl font-bold text-black mb-2">⚡</div>
                <p className="font-semibold text-black">Zero Setup Required</p>
                <p className="text-sm text-gray-600 mt-3">No tools to install, no dependencies to manage. Start scanning immediately without complex configuration.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors bg-gray-50/50">
                <div className="text-3xl font-bold text-black mb-2">📈</div>
                <p className="font-semibold text-black">Infinitely Scalable</p>
                <p className="text-sm text-gray-600 mt-3">Cloud-based infrastructure handles unlimited concurrent scans. Scale from single images to enterprise-wide deployments.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors bg-gray-50/50">
                <div className="text-3xl font-bold text-black mb-2">🤖</div>
                <p className="font-semibold text-black">AI-Powered Insights</p>
                <p className="text-sm text-gray-600 mt-3">Advanced AI automatically analyzes complex vulnerability data and delivers clear, actionable recommendations.</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="feature-card border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-black text-lg mb-2">Vulnerability Scanning</h3>
                <p className="text-sm text-gray-600">Comprehensive analysis of Docker images for security threats</p>
              </div>
              <div className="feature-card border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-black text-lg mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-gray-600">Continuous protection against new vulnerabilities</p>
              </div>
              <div className="feature-card border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-black text-lg mb-2">Compliance Reports</h3>
                <p className="text-sm text-gray-600">Detailed audit trails and compliance documentation</p>
              </div>
              <div className="feature-card border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-black text-lg mb-2">API Integration</h3>
                <p className="text-sm text-gray-600">Seamless integration with your existing CI/CD pipeline</p>
              </div>
            </div>

            {/* AI Summary Section */}
            <div className="border border-gray-200 rounded-lg p-8 bg-gradient-to-br from-blue-50/50 to-white pt-12">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
                  Powered by AI
                </div>
                <h2 className="tasa-orbiter-heading text-3xl text-black">Smart Vulnerability Analysis</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our AI engine doesn't just scan—it understands. Forget overwhelming JSON reports and CVE lists. We automatically 
                  <span className="font-semibold text-black"> synthesize complex vulnerability data</span> into intelligent, prioritized insights you can act on immediately.
                </p>
                <ul className="space-y-3 pt-4">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl mt-1">→</span>
                    <div>
                      <p className="font-semibold text-black">Intelligent Prioritization</p>
                      <p className="text-sm text-gray-600">AI ranks vulnerabilities by real impact on your environment, not just severity scores</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl mt-1">→</span>
                    <div>
                      <p className="font-semibold text-black">Context-Aware Recommendations</p>
                      <p className="text-sm text-gray-600">Get specific remediation steps tailored to your technology stack and architecture</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl mt-1">→</span>
                    <div>
                      <p className="font-semibold text-black">Natural Language Explanations</p>
                      <p className="text-sm text-gray-600">Understand what each vulnerability means and why it matters—without technical jargon</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section - Recent Breakages */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200/30 rounded-lg p-8 bg-white/10 backdrop-blur-md sticky top-8 h-fit">
              <h2 className="text-xl font-bold text-black mb-6">Recent Breakages</h2>
              
              <div className="marquee-container">
                <div className="marquee-content">
                  {[...allBreakages, ...allBreakages].map((breakage, index) => (
                    <div
                      key={`${breakage.id}-${index}`}
                      className={`flex-shrink-0 w-full border-l-4 border-${breakage.color}-500 pl-4 py-3 bg-white/5 backdrop-blur-sm rounded p-3 animate-fadeIn`}
                    >
                      <p className="font-semibold text-black text-sm">{breakage.name}</p>
                      <p className="text-xs text-gray-700 mt-1">{breakage.id}</p>
                      <p className={`text-xs text-${breakage.color}-600 font-medium mt-2`}>{breakage.severity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full mt-6 py-2 border border-gray-300/30 text-black text-sm font-medium rounded-lg hover:bg-white/10 transition-colors">
                View All Issues
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Why Choose Us Section - At Bottom */}
      <div className="relative z-10 w-full px-4 py-20">
        <div className="max-w-5xl w-full mx-auto">
          <div className="border border-gray-200 rounded-lg p-12 bg-gradient-to-br from-white to-gray-50">
            <h2 className="tasa-orbiter-heading text-4xl text-black mb-8">Built for Modern DevOps</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 tasa-orbiter-heading ">
              {/* The Problem We Solve */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-black">The Problem</h3>
                <p className="text-gray-700 leading-relaxed tasa-orbiter-heading">
                  Traditional Docker scanning is broken. Teams juggle multiple tools (<span className="font-mono bg-gray-200 px-2 py-1 rounded text-xs">trivy</span>, <span className="font-mono bg-gray-200 px-2 py-1 rounded text-xs">grype</span>, <span className="font-mono bg-gray-200 px-2 py-1 rounded text-xs">snyk</span>), manage complex dependencies, and waste hours interpreting raw vulnerability data.
                </p>
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-1">✗</span>
                    <span className="text-sm text-gray-700">Local scanning requires setup, infrastructure, and maintenance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-1">✗</span>
                    <span className="text-sm text-gray-700">Multiple tools produce conflicting results and inconsistent data</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-1">✗</span>
                    <span className="text-sm text-gray-700">Raw reports are overwhelming—hard to prioritize and act on</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-1">✗</span>
                    <span className="text-sm text-gray-700">Slow integration into CI/CD pipelines delays deployments</span>
                  </div>
                </div>
              </div>

              {/* Our Solution */}
              <div className="space-y-6 tasa-orbiter-heading">
                <h3 className="text-xl font-semibold text-black">Our Solution</h3>
                <p className="text-gray-700 leading-relaxed">
                  dockerguard eliminates the complexity. <span className="font-semibold text-black">Paste a Docker image. Get instant, intelligent analysis.</span> No setup. No hassle. Just clear security insights.
                </p>
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-sm text-gray-700"><span className="font-semibold">Unified Platform</span> — One place for all your Docker security</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-sm text-gray-700"><span className="font-semibold">AI-Powered</span> — Smart analysis that understands context</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-sm text-gray-700"><span className="font-semibold">Instant Results</span> — Scan and get actionable insights immediately</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-sm text-gray-700"><span className="font-semibold">Enterprise Scale</span> — Cloud infrastructure handles unlimited growth</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scalability & Efficiency Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 tasa-orbiter-heading">
              <h3 className="text-xl font-semibold text-black mb-8">Efficiency & Scale</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="inline-block px-4 py-2 bg-white text-black rounded-lg text-lg font-bold"><GoGraph /></div>
                  <h4 className="font-semibold text-black text-lg">Unlimited Concurrency</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Our cloud-native architecture handles thousands of concurrent scans without slowdown. Enterprise teams can scan entire registries in minutes, not hours.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="inline-block px-4 py-2 bg-white text-black rounded-lg text-lg font-bold"><IoMdSettings /></div>
                  <h4 className="font-semibold text-black text-lg">Zero Maintenance</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    We maintain all scanning tools, vulnerability databases, and infrastructure. You focus on security, we handle the ops.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="inline-block px-4 py-2 bg-white text-black rounded-lg text-lg font-bold"><IoIosSync /></div>
                  <h4 className="font-semibold text-black text-lg">Always Updated</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Vulnerability databases, scanning engines, and AI models are automatically updated daily. You never fall behind on threats.
                  </p>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mt-12 pt-8 border-t border-gray-200 tasa-orbiter-heading">
              <h3 className="text-xl font-semibold text-black mb-6">How It Works</h3>
              <div className="flex items-center justify-between gap-4">
                <div className="text-center flex-1">
                  <div className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-3 border border-black">1</div>
                  <p className="font-semibold text-black text-sm">Paste Image</p>
                  <p className="text-xs text-gray-600 mt-1">Enter your Docker image</p>
                </div>
                
                <p className="text-2xl text-gray-400">→</p>

                <div className="text-center flex-1">
                  <div className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-3 border border-black">2</div>
                  <p className="font-semibold text-black text-sm">Comprehensive Scan</p>
                  <p className="text-xs text-gray-600 mt-1">Multiple scan engines run</p>
                </div>

                <p className="text-2xl text-gray-400">→</p>

                <div className="text-center flex-1">
                  <div className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-3 border border-black">3</div>
                  <p className="font-semibold text-black text-sm">AI Analysis</p>
                  <p className="text-xs text-gray-600 mt-1">AI synthesizes findings</p>
                </div>

                <p className="text-2xl text-gray-400">→</p>

                <div className="text-center flex-1">
                  <div className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-3 border border-black">4</div>
                  <p className="font-semibold text-black text-sm">Get Insights</p>
                  <p className="text-xs text-gray-600 mt-1">Actionable recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
 