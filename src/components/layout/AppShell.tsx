import { NavLink, Outlet, Link } from 'react-router-dom';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', th: 'ภาพรวม' },
  { to: '/roadmap', label: 'Roadmap', th: 'แผนการเรียน' },
  { to: '/simulation', label: 'Simulation', th: 'จำลองอาชีพ' },
  { to: '/portfolio', label: 'Portfolio', th: 'พอร์ตโฟลิโอ' },
];

export default function AppShell() {
  return (
    <div className="min-h-screen bg-[var(--color-midnight-ink)] text-[var(--color-polar-white)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-carbon)] bg-[var(--color-midnight-ink)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <span className="mono-tag">ZERO / GAP</span>
            <span
              className="text-[18px]"
              style={{ fontFamily: 'var(--font-aspekta)', letterSpacing: '-0.02em' }}
            >
              Career &amp; TCAS Navigator
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  [
                    'rounded-[8px] border px-4 py-2 text-[15px] transition-colors',
                    isActive
                      ? 'border-[var(--color-bio-green)] bg-[var(--color-bio-green)] text-[var(--color-carbon)]'
                      : 'border-[var(--color-carbon)] text-[var(--color-polar-white)] hover:bg-[rgba(255,255,255,0.06)]',
                  ].join(' ')
                }
              >
                <span className="hidden sm:inline">{n.label}</span>
                <span className="sm:hidden" lang="th">
                  {n.th}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1280px] px-6 py-10">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-[1280px] px-6 py-10 text-[13px] text-[var(--color-fog)]">
        <span className="mono-tag-ghost">ZERO GAP · MOCK BUILD · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
