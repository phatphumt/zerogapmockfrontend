import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

const STEPS = [
  { path: '/onboarding/level', label: '01 ระดับชั้น' },
  { path: '/onboarding/career', label: '02 อาชีพ' },
  { path: '/onboarding/university', label: '03 มหาวิทยาลัย' },
  { path: '/onboarding/assets', label: '04 ทรัพยากร' },
  { path: '/onboarding/results', label: 'ผลลัพธ์' },
];

export default function OnboardingLayout() {
  const loc = useLocation();
  const navigate = useNavigate();
  const idx = STEPS.findIndex((s) => loc.pathname.startsWith(s.path));
  const current = idx === -1 ? 0 : idx;
  const pct = ((current + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-[var(--color-midnight-ink)] text-[var(--color-polar-white)]">
      <header className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-6">
        <button onClick={() => navigate('/')} className="mono-tag-ghost">
          ← กลับหน้าแรก
        </button>
        <span className="mono-tag">{STEPS[current]?.label ?? '—'}</span>
      </header>

      <div className="mx-auto max-w-[1100px] px-6">
        <div className="h-[2px] w-full bg-[var(--color-carbon)]">
          <div
            className="h-full bg-[var(--color-bio-green)] transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.path}>
              <NavLink
                to={s.path}
                className={({ isActive }) =>
                  [
                    'block rounded-[8px] border px-3 py-2 text-[12px] uppercase tracking-tight',
                    'font-mono',
                    isActive || i <= current
                      ? 'border-[var(--color-bio-green)] text-[var(--color-bio-green)]'
                      : 'border-[var(--color-carbon)] text-[var(--color-fog)]',
                  ].join(' ')
                }
                style={{ fontFamily: 'var(--font-roboto-mono)' }}
              >
                {s.label}
              </NavLink>
            </li>
          ))}
        </ol>
      </div>

      <main className="mx-auto max-w-[1100px] px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
}
