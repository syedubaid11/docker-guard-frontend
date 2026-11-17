const columns = [
  {
    heading: "Product",
    links: ["Vulnerability scanning", "Continuous watch", "AI triage"],
  },
  {
    heading: "Platform",
    links: ["Compliance reports", "Pipeline API", "Status"],
  },
  {
    heading: "Company",
    links: ["Docs", "Changelog", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[15px] font-medium tracking-tight">
              dockerguard<span className="text-dim">.</span>
            </p>
            <p className="mt-3 max-w-[16rem] text-[13px] leading-relaxed text-dim">
              Container vulnerability scanning without the tooling.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                {column.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link} className="text-[13px] text-muted">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-6">
          <p className="font-mono text-[11px] text-dim">
            &copy; {new Date().getFullYear()} dockerguard
          </p>
        </div>
      </div>
    </footer>
  );
}
