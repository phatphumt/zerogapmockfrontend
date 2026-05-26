import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';

const ASSETS = [
  { id: 'gat', label: 'คะแนน TGAT' },
  { id: 'pat1', label: 'คะแนน TPAT' },
  { id: 'ielts', label: 'IELTS / TOEFL' },
  { id: 'a-level-bio', label: 'A-Level ชีววิทยา' },
  { id: 'a-level-chem', label: 'A-Level เคมี' },
  { id: 'a-level-math', label: 'A-Level คณิตศาสตร์' },
  { id: 'volunteer', label: 'ใบประกาศจิตอาสา' },
  { id: 'competition', label: 'รางวัลการแข่งขัน' },
  { id: 'project', label: 'ผลงานโปรเจกต์' },
];

export default function Step4Assets() {
  const navigate = useNavigate();
  const surveys = useStore((s) => s.surveys);
  const updateSurveys = useStore((s) => s.updateSurveys);

  function toggle(id: string) {
    const set = new Set(surveys.assets);
    set.has(id) ? set.delete(id) : set.add(id);
    updateSurveys({ assets: Array.from(set) });
  }

  return (
    <section>
      <h2
        className="mb-3"
        style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.1 }}
      >
        ตอนนี้คุณมีอะไรในมือบ้าง?
      </h2>
      <p className="mb-10 text-[18px] text-[var(--color-sage-mist)]">
        เลือกได้หลายข้อ — เราจะใช้ปรับค่าเริ่มต้นของ Skill Vector
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {ASSETS.map((a) => {
          const active = surveys.assets.includes(a.id);
          return (
            <button
              key={a.id}
              onClick={() => toggle(a.id)}
              className={[
                'flex items-center justify-between rounded-[8px] border px-5 py-4 text-left transition-colors cursor-pointer',
                active
                  ? 'border-[var(--color-bio-green)] bg-[var(--color-bio-green)] text-[var(--color-carbon)]'
                  : 'border-[var(--color-fog)] bg-[var(--color-carbon)] text-[var(--color-polar-white)] hover:border-[var(--color-polar-white)]',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-aspekta)', fontSize: 18 }}
            >
              <span>{a.label}</span>
              <span style={{ fontFamily: 'var(--font-roboto-mono)', fontSize: 13 }}>{active ? '+ ADDED' : '+ ADD'}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex justify-between">
        <button onClick={() => navigate('/onboarding/university')} className="btn btn-ghost">
          ← ย้อนกลับ
        </button>
        <button onClick={() => navigate('/onboarding/results')} className="btn btn-accent">
          ดูผลลัพธ์ →
        </button>
      </div>
    </section>
  );
}
