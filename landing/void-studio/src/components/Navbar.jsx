import { useEffect, useState } from 'react';

const navItems = ['WORK', 'PHILOSOPHY', 'PROCESS', 'CLIENTS', 'CONTACT'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-14 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink text-paper border-b border-acid'
          : 'bg-paper text-ink'
      }`}
    >
      <div className="max-w-grid mx-auto h-full px-6 flex items-center justify-between">
        <div className="font-mono text-sm tracking-wider font-medium">
          VOID®
        </div>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative font-mono text-xs tracking-system uppercase overflow-hidden group"
            >
              <span className="relative z-10">{item}</span>
              <span
                className={`absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ${
                  scrolled ? 'bg-paper' : 'bg-acid'
                }`}
                style={{ transform: 'scaleY(0)', transformOrigin: 'bottom' }}
              />
              <span
                className={`absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ${
                  scrolled ? 'bg-acid' : 'bg-ink'
                }`}
                style={{
                  transform: 'scaleY(0)',
                  transformOrigin: 'bottom',
                  zIndex: -1,
                }}
              />
            </a>
          ))}

          <div
            className={`font-mono text-xs px-3 py-1 border transition-colors duration-300 ${
              scrolled
                ? 'border-acid text-acid animate-pulse'
                : 'border-ink text-ink'
            }`}
            style={{ animationDuration: '2s' }}
          >
            [ OPEN FOR WORK ]
          </div>
        </div>
      </div>
    </nav>
  );
}
