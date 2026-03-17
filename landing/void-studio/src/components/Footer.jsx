const footerNav = [
  { label: 'WORK', href: '#work' },
  { label: 'PHILOSOPHY', href: '#philosophy' },
  { label: 'PROCESS', href: '#process' },
  { label: 'CLIENTS', href: '#clients' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-ink py-16 px-6">
      <div className="max-w-grid mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="font-mono text-lg text-paper mb-4">VOID®</div>
            <p className="font-mono text-xs text-paper/60 max-w-xs">
              Design is not decoration. It is the architecture of attention.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {footerNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-xs text-paper/60 hover:text-acid transition-colors tracking-system uppercase w-fit"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-start md:justify-end">
            <div className="flex items-center gap-2 font-mono text-xs text-paper">
              <span className="w-2 h-2 bg-acid rounded-full pulse-dot" />
              <span>[ SYSTEM ONLINE ]</span>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/20 pt-6">
          <p className="font-mono text-[10px] text-paper/40 tracking-system text-center md:text-left">
            © 2025 VOID STUDIO — ALL RIGHTS RESERVED — MADE WITH OBSESSION
          </p>
        </div>
      </div>
    </footer>
  );
}
