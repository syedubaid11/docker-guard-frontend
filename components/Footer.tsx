export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-2">
            <h3 className="tasa-orbiter-display text-2xl text-black font-bold">
              dockerguard.
            </h3>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-black text-sm">Vulnerability Scanning</h4>
            <h4 className="font-semibold text-black text-sm">Real-time Monitoring</h4>
            <h4 className="font-semibold text-black text-sm">AI-Powered Analysis</h4>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-black text-sm">Compliance Reports</h4>
            <h4 className="font-semibold text-black text-sm">API Integration</h4>
            <h4 className="font-semibold text-black text-sm">Zero Setup Required</h4>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-black text-sm">Infinitely Scalable</h4>
            <h4 className="font-semibold text-black text-sm">Zero Maintenance</h4>
            <h4 className="font-semibold text-black text-sm">Always Updated</h4>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex justify-between items-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} dockerguard.
          </p>
        </div>
      </div>
    </footer>
  );
}
