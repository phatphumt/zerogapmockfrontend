import { Link } from 'react-router-dom';
import { SCENARIOS } from '@/data/scenarios';
import { useStore } from '@/lib/store';

export default function Simulation() {
  const results = useStore((s) => s.simulationResults);
  return (
    <div className="space-y-8">
      <header>
        <span className="mono-tag-ghost mb-3 inline-flex">CAREER SIMULATION</span>
        <h1
          className="mt-3"
          style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.05 }}
        >
          ทดลอง "เป็น" อาชีพในฝันสักหนึ่งวัน
        </h1>
        <p className="mt-2 text-[18px] text-[var(--color-sage-mist)]">
          แต่ละโมดูลจะให้คุณตัดสินใจในสถานการณ์จริง — ผลลัพธ์ส่งผลต่อ Skill Vector ของคุณ
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SCENARIOS.map((m) => {
          const runs = results.filter((r) => r.moduleId === m.id).length;
          return (
            <Link
              key={m.id}
              to={`/simulation/${m.id}`}
              className="rounded-[40px] border border-[var(--color-sage-mist)] bg-[var(--color-cloud-canvas)] p-10 text-[var(--color-carbon)] transition-colors hover:border-[var(--color-bio-green)]"
            >
              <span className="mono-tag inline-flex">MODULE · {m.cards.length} CARDS</span>
              <h3
                className="mt-6"
                style={{ fontFamily: 'var(--font-aspekta)', fontSize: 42, letterSpacing: '-0.02em', lineHeight: 1.1 }}
              >
                {m.title}
              </h3>
              <p className="mt-6 text-[18px]" style={{ color: 'var(--color-fog)' }}>
                {m.description}
              </p>
              <div
                className="mt-8 flex items-center justify-between text-[13px]"
                style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-fog)' }}
              >
                <span>{runs > 0 ? `ทำแล้ว ${runs} ครั้ง` : 'ยังไม่เคยลอง'}</span>
                <span>START →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
