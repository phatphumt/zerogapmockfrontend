import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getModule } from '@/data/scenarios';
import { useStore } from '@/lib/store';
import type { SkillAxis, SkillVector } from '@/lib/types';
import { SKILL_AXES } from '@/data/skill-axes';

const ZERO: SkillVector = {
  logic: 0, language: 0, science: 0, empathy: 0, creativity: 0, discipline: 0,
};

export default function SimulationRun() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const recordSimResult = useStore((s) => s.recordSimResult);
  const awardXp = useStore((s) => s.awardXp);

  const mod = useMemo(() => getModule(moduleId ?? ''), [moduleId]);
  const [idx, setIdx] = useState(0);
  const [deltas, setDeltas] = useState<SkillVector>({ ...ZERO });
  const [done, setDone] = useState(false);

  if (!mod) {
    return (
      <div className="space-y-6">
        <p>ไม่พบโมดูล</p>
        <Link to="/simulation" className="btn btn-ghost">
          ← กลับ
        </Link>
      </div>
    );
  }

  const card = mod.cards[idx];
  const safeMod = mod;

  function pick(choiceId: string) {
    const c = card.choices.find((x) => x.id === choiceId);
    if (!c) return;
    const next: SkillVector = { ...deltas };
    for (const k of Object.keys(c.deltas) as SkillAxis[]) {
      next[k] += c.deltas[k] ?? 0;
    }
    setDeltas(next);

    if (idx + 1 >= safeMod.cards.length) {
      const totalGain = Object.values(next).reduce((a, b) => a + b, 0);
      const exp = Math.max(40, Math.round(totalGain * 2));
      recordSimResult({
        moduleId: safeMod.id,
        finishedAt: new Date().toISOString(),
        deltas: next,
      });
      awardXp(exp);
      setDone(true);
    } else {
      setIdx(idx + 1);
    }
  }

  if (done) {
    const positive = SKILL_AXES.filter((a) => deltas[a.id] > 0);
    const negative = SKILL_AXES.filter((a) => deltas[a.id] < 0);
    return (
      <div className="space-y-8">
        <header>
          <span className="mono-tag-ghost mb-3 inline-flex">SIMULATION RESULT</span>
          <h1
            className="mt-3"
            style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            จบเส้นทาง {mod.title}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[40px] border border-[var(--color-sage-mist)] bg-[var(--color-cloud-canvas)] p-10 text-[var(--color-carbon)]">
            <span className="mono-tag inline-flex">SKILL DELTA</span>
            <ul className="mt-6 space-y-3">
              {SKILL_AXES.map((a) => {
                const v = deltas[a.id];
                if (!v) return null;
                return (
                  <li key={a.id} className="flex items-baseline justify-between border-b border-[var(--color-sage-mist)] pb-2">
                    <span style={{ fontFamily: 'var(--font-aspekta)', fontSize: 22 }}>{a.label}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-roboto-mono)',
                        fontSize: 22,
                        color: v > 0 ? 'var(--color-deep-sea)' : 'var(--color-fog)',
                      }}
                    >
                      {v > 0 ? '+' : ''}
                      {v}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-[40px] border border-[var(--color-fog)] bg-[var(--color-carbon)] p-10 text-[var(--color-polar-white)]">
            <span className="mono-tag inline-flex">TAKEAWAY</span>
            <p className="mt-6 text-[18px] text-[var(--color-sage-mist)]">
              ผลลัพธ์ถูกบันทึกในโปรไฟล์เรียบร้อย และจะปรับ Readiness Score บนแดชบอร์ด
            </p>
            {positive.length > 0 && (
              <p className="mt-6 text-[16px]">
                จุดแข็งที่ได้รับ:{' '}
                {positive.map((a) => a.label).join(', ')}
              </p>
            )}
            {negative.length > 0 && (
              <p className="mt-3 text-[16px] text-[var(--color-sage-mist)]">
                ส่วนที่ต้องระวัง: {negative.map((a) => a.label).join(', ')}
              </p>
            )}
            <div className="mt-10 flex gap-3">
              <button onClick={() => navigate('/dashboard')} className="btn btn-accent">
                กลับแดชบอร์ด
              </button>
              <button onClick={() => navigate('/simulation')} className="btn btn-ghost">
                เลือกโมดูลอื่น
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex items-baseline justify-between">
        <div>
          <span className="mono-tag-ghost mb-3 inline-flex">{mod.title.toUpperCase()}</span>
          <h1
            className="mt-3"
            style={{ fontFamily: 'var(--font-aspekta)', fontSize: 42, letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            ฉาก {idx + 1} / {mod.cards.length}
          </h1>
        </div>
        <span className="mono-tag">CARD · {String(idx + 1).padStart(2, '0')}</span>
      </header>

      <div className="rounded-[40px] border border-[var(--color-sage-mist)] bg-[var(--color-cloud-canvas)] p-10 text-[var(--color-carbon)]">
        <p
          style={{ fontFamily: 'var(--font-aspekta)', fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.2 }}
        >
          {card.prompt}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4">
          {card.choices.map((c) => (
            <button
              key={c.id}
              onClick={() => pick(c.id)}
              className="flex items-center justify-between rounded-[8px] border border-[var(--color-carbon)] bg-transparent px-6 py-5 text-left text-[var(--color-carbon)] transition-colors hover:border-[var(--color-bio-green)] hover:bg-[var(--color-bio-green)] cursor-pointer"
            >
              <span style={{ fontFamily: 'var(--font-aspekta)', fontSize: 22 }}>{c.label}</span>
              <span style={{ fontFamily: 'var(--font-roboto-mono)', fontSize: 13 }}>SELECT →</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Link to="/simulation" className="btn btn-ghost">
          ← ออกจากโมดูล
        </Link>
      </div>
    </div>
  );
}
