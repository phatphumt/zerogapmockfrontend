import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import type { Level } from '@/lib/types';

const LEVELS: { id: Level; tag: string; description: string }[] = [
  { id: 'ม.4', tag: 'GRADE / 10', description: 'เพิ่งขึ้น ม.ปลาย — มีเวลาวางแผนยาว' },
  { id: 'ม.5', tag: 'GRADE / 11', description: 'อยู่กลางทาง — เน้นปรับสมดุลวิชาเอก' },
  { id: 'ม.6', tag: 'GRADE / 12', description: 'ปีสุดท้าย — โหมดเตรียมสอบเต็มกำลัง' },
];

export default function Step1Level() {
  const navigate = useNavigate();
  const surveys = useStore((s) => s.surveys);
  const updateSurveys = useStore((s) => s.updateSurveys);

  return (
    <section>
      <h2
        className="mb-3"
        style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.1 }}
      >
        ตอนนี้คุณอยู่ระดับชั้นไหน?
      </h2>
      <p className="mb-10 text-[18px] text-[var(--color-sage-mist)]">
        เราจะใช้ข้อมูลนี้กำหนดจุดเริ่มต้นของแผนการเรียน
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {LEVELS.map((lv) => {
          const active = surveys.level === lv.id;
          return (
            <button
              key={lv.id}
              onClick={() => updateSurveys({ level: lv.id })}
              className={[
                'rounded-[40px] border p-10 text-left transition-colors cursor-pointer',
                active
                  ? 'border-[var(--color-bio-green)] bg-[var(--color-carbon)] text-[var(--color-polar-white)]'
                  : 'border-[var(--color-fog)] bg-[var(--color-carbon)] text-[var(--color-polar-white)] hover:border-[var(--color-bio-green)]',
              ].join(' ')}
            >
              <span className="mono-tag mb-6 inline-flex">{lv.tag}</span>
              <div
                className="mt-6"
                style={{ fontFamily: 'var(--font-aspekta)', fontSize: 75, lineHeight: 1, letterSpacing: '-0.03em' }}
              >
                {lv.id}
              </div>
              <p className="mt-6 text-[var(--color-sage-mist)]" style={{ fontSize: 18, lineHeight: 1.4 }}>
                {lv.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex justify-end">
        <button
          disabled={!surveys.level}
          onClick={() => navigate('/onboarding/career')}
          className="btn btn-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          ถัดไป →
        </button>
      </div>
    </section>
  );
}
