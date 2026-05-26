import { useNavigate } from 'react-router-dom';
import { CAREERS } from '@/data/careers';
import { useStore } from '@/lib/store';

export default function Step2Career() {
  const navigate = useNavigate();
  const surveys = useStore((s) => s.surveys);
  const updateSurveys = useStore((s) => s.updateSurveys);

  return (
    <section>
      <h2
        className="mb-3"
        style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.1 }}
      >
        อาชีพในฝันของคุณคืออะไร?
      </h2>
      <p className="mb-10 text-[18px] text-[var(--color-sage-mist)]">
        เลือก 1 อาชีพ — ใช้กำหนด "เป้าหมาย" บนแผนภาพรัศมีของคุณ
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CAREERS.map((c) => {
          const active = surveys.careerId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => updateSurveys({ careerId: c.id })}
              className={[
                'rounded-[40px] border p-10 text-left transition-colors cursor-pointer',
                active
                  ? 'border-[var(--color-bio-green)] bg-[var(--color-cloud-canvas)] text-[var(--color-carbon)]'
                  : 'border-[var(--color-sage-mist)] bg-[var(--color-cloud-canvas)] text-[var(--color-carbon)] hover:border-[var(--color-bio-green)]',
              ].join(' ')}
            >
              <span className="mono-tag mb-6 inline-flex">{c.id.toUpperCase().slice(0, 8)}</span>
              <h3
                className="mt-6"
                style={{ fontFamily: 'var(--font-aspekta)', fontSize: 42, letterSpacing: '-0.02em', lineHeight: 1.1 }}
              >
                {c.title}
              </h3>
              <p className="mt-6 text-[18px] leading-snug" style={{ color: 'var(--color-fog)' }}>
                {c.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex justify-between">
        <button onClick={() => navigate('/onboarding/level')} className="btn btn-ghost">
          ← ย้อนกลับ
        </button>
        <button
          disabled={!surveys.careerId}
          onClick={() => navigate('/onboarding/university')}
          className="btn btn-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          ถัดไป →
        </button>
      </div>
    </section>
  );
}
