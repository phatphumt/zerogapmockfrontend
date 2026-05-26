import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { getCareer } from '@/data/careers';
import { getUniversity } from '@/data/universities';
import { currentVector, radarSeries, targetVector } from '@/lib/skills';
import SkillRadar from '@/components/radar/SkillRadar';

export default function Results() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const surveys = useStore((s) => s.surveys);
  const saveProfile = useStore((s) => s.saveProfile);

  const career = getCareer(surveys.careerId);
  const current = useMemo(
    () => currentVector({ surveys, completedNodeIds: [], simulationResults: [] }),
    [surveys],
  );
  const target = useMemo(() => targetVector(surveys.careerId), [surveys.careerId]);
  const data = useMemo(() => radarSeries(current, target), [current, target]);

  function save() {
    if (!surveys.level) return;
    saveProfile({
      name: name.trim() || 'นักเรียนนิรนาม',
      level: surveys.level,
      createdAt: new Date().toISOString(),
    });
    navigate('/dashboard');
  }

  const gaps = data
    .map((d) => ({ axis: d.axis, gap: d.target - d.current }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  return (
    <section>
      <span className="mono-tag-ghost mb-6 inline-flex">PERSONAL ADMISSION BRIEF</span>
      <h2
        className="mb-2"
        style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.1 }}
      >
        ภาพรวมของคุณในฐานะ {career?.title ?? 'นักเรียน'}
      </h2>
      <p className="mb-10 text-[18px] text-[var(--color-sage-mist)]">
        เราเทียบ "ความสามารถปัจจุบัน" ของคุณกับ "เป้าหมายอาชีพ" บนแกนทักษะ 6 ด้าน
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-[40px] border border-[var(--color-sage-mist)] bg-[var(--color-cloud-canvas)] p-10 lg:col-span-2 text-[var(--color-carbon)]">
          <SkillRadar data={data} height={420} />
        </div>

        <div className="rounded-[40px] border border-[var(--color-fog)] bg-[var(--color-carbon)] p-10 text-[var(--color-polar-white)]">
          <span className="mono-tag mb-4 inline-flex">SKILL GAP · TOP 3</span>
          <ul className="mt-6 space-y-5">
            {gaps.map((g) => (
              <li key={g.axis} className="flex items-baseline justify-between border-b border-[var(--color-fog)] pb-3">
                <span style={{ fontFamily: 'var(--font-aspekta)', fontSize: 22 }}>{g.axis}</span>
                <span
                  style={{ fontFamily: 'var(--font-roboto-mono)', fontSize: 22, color: 'var(--color-bio-green)' }}
                >
                  +{Math.max(0, Math.round(g.gap))}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-[var(--color-sage-mist)]">
            ช่องว่างเหล่านี้คือสิ่งที่ Roadmap จะช่วยคุณปิดทีละขั้น
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-[40px] border border-[var(--color-sage-mist)] bg-[var(--color-cloud-canvas)] p-10">
          <span className="mono-tag mb-4 inline-flex">TARGET UNIVERSITIES</span>
          <ul className="mt-6 space-y-4">
            {surveys.universityIds.map((id) => {
              const u = getUniversity(id);
              if (!u) return null;
              return (
                <li
                  key={id}
                  className="flex items-baseline justify-between border-b border-[var(--color-sage-mist)] pb-3 text-[var(--color-carbon)]"
                >
                  <span style={{ fontFamily: 'var(--font-aspekta)', fontSize: 22 }}>
                    {u.name} — {u.program}
                  </span>
                  <span style={{ fontFamily: 'var(--font-roboto-mono)', fontSize: 14 }}>
                    PF · {u.round1ThresholdPortfolio}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-[40px] border border-[var(--color-fog)] bg-[var(--color-carbon)] p-10 text-[var(--color-polar-white)]">
          <span className="mono-tag mb-4 inline-flex">SAVE PROFILE</span>
          <p className="mt-4 mb-6 text-[18px] text-[var(--color-sage-mist)]">
            ตั้งชื่อโปรไฟล์เพื่อสร้างแดชบอร์ดถาวร
          </p>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-[14px]"
            style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-sage-mist)' }}
          >
            ชื่อที่อยากให้ Copilot เรียก
          </label>
          <input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="เช่น พิม"
            className="input input-dark"
          />
          <button onClick={save} className="btn btn-accent mt-8 w-full">
            บันทึกโปรไฟล์ → เข้าแดชบอร์ด
          </button>
          <button onClick={() => navigate('/onboarding/assets')} className="btn btn-ghost mt-3 w-full">
            ← ย้อนกลับแก้ไข
          </button>
        </div>
      </div>
    </section>
  );
}
