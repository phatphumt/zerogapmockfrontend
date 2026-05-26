import { useNavigate } from 'react-router-dom';
import { UNIVERSITIES } from '@/data/universities';
import { useStore } from '@/lib/store';

const MAX = 3;

export default function Step3University() {
  const navigate = useNavigate();
  const surveys = useStore((s) => s.surveys);
  const updateSurveys = useStore((s) => s.updateSurveys);

  function toggle(id: string) {
    const sel = new Set(surveys.universityIds);
    if (sel.has(id)) sel.delete(id);
    else if (sel.size < MAX) sel.add(id);
    updateSurveys({ universityIds: Array.from(sel) });
  }

  return (
    <section>
      <h2
        className="mb-3"
        style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.1 }}
      >
        เลือกมหาวิทยาลัยเป้าหมาย
      </h2>
      <p className="mb-10 text-[18px] text-[var(--color-sage-mist)]">
        เลือกได้สูงสุด {MAX} แห่ง — เราจะคำนวณ "Readiness Score" ให้แต่ละแห่ง
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {UNIVERSITIES.map((u) => {
          const active = surveys.universityIds.includes(u.id);
          const disabled = !active && surveys.universityIds.length >= MAX;
          return (
            <button
              key={u.id}
              disabled={disabled}
              onClick={() => toggle(u.id)}
              className={[
                'rounded-[40px] border p-10 text-left transition-colors',
                active
                  ? 'border-[var(--color-bio-green)] bg-[var(--color-light-gray)] text-[var(--color-carbon)] cursor-pointer'
                  : disabled
                    ? 'border-[var(--color-fog)] bg-[var(--color-carbon)] text-[var(--color-fog)] cursor-not-allowed opacity-50'
                    : 'border-[var(--color-sage-mist)] bg-[var(--color-cloud-canvas)] text-[var(--color-carbon)] cursor-pointer hover:border-[var(--color-bio-green)]',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="mono-tag mb-4 inline-flex">{u.id.toUpperCase()}</span>
                  <h3
                    className="mt-4"
                    style={{ fontFamily: 'var(--font-aspekta)', fontSize: 24, letterSpacing: '-0.006em', lineHeight: 1.2 }}
                  >
                    {u.name}
                  </h3>
                  <p className="mt-2 text-[18px]" style={{ color: 'var(--color-fog)' }}>
                    {u.program}
                  </p>
                </div>
                <span
                  className={[
                    'mt-1 grid h-6 w-6 place-items-center rounded-[4px] border',
                    active
                      ? 'border-[var(--color-bio-green)] bg-[var(--color-bio-green)] text-[var(--color-carbon)]'
                      : 'border-[var(--color-fog)]',
                  ].join(' ')}
                >
                  {active ? '✓' : ''}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="mono-tag-ghost" style={{ borderColor: 'var(--color-fog)', color: 'var(--color-fog)' }}>
                  MIN · {u.minScore}
                </span>
                <span className="mono-tag-ghost" style={{ borderColor: 'var(--color-fog)', color: 'var(--color-fog)' }}>
                  PORTFOLIO · {u.round1ThresholdPortfolio}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex justify-between">
        <button onClick={() => navigate('/onboarding/career')} className="btn btn-ghost">
          ← ย้อนกลับ
        </button>
        <button
          disabled={surveys.universityIds.length === 0}
          onClick={() => navigate('/onboarding/assets')}
          className="btn btn-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          ถัดไป →
        </button>
      </div>
    </section>
  );
}
