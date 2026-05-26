import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { getCareer } from '@/data/careers';
import { ROADMAP_NODES } from '@/data/roadmap-nodes';
import { SCENARIOS } from '@/data/scenarios';
import { UNIVERSITIES } from '@/data/universities';
import { levelFromXp, progressInLevel } from '@/lib/exp';
import { diffParts, nextTcasTarget } from '@/lib/tcas';
import { currentVector, radarSeries, targetVector } from '@/lib/skills';
import { readinessFor } from '@/lib/readiness';
import BentoGrid from '@/components/bento/BentoGrid';
import BentoCard from '@/components/bento/BentoCard';
import SkillRadar from '@/components/radar/SkillRadar';

export default function Dashboard() {
  const profile = useStore((s) => s.profile)!;
  const surveys = useStore((s) => s.surveys);
  const xp = useStore((s) => s.xp);
  const completedNodeIds = useStore((s) => s.completedNodeIds);
  const simulationResults = useStore((s) => s.simulationResults);
  const portfolioEntries = useStore((s) => s.portfolioEntries);

  const career = getCareer(surveys.careerId);
  const lvl = levelFromXp(xp);
  const prog = progressInLevel(xp);

  const target = nextTcasTarget();
  const [parts, setParts] = useState(() => diffParts(new Date(target.date)));
  useEffect(() => {
    const id = setInterval(() => setParts(diffParts(new Date(target.date))), 1000);
    return () => clearInterval(id);
  }, [target.date]);

  const data = radarSeries(
    currentVector({ surveys, completedNodeIds, simulationResults }),
    targetVector(surveys.careerId),
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mono-tag-ghost mb-3 inline-flex">COMMAND CENTER</span>
          <h1
            className="mt-3"
            style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            สวัสดี {profile.name}
          </h1>
          <p className="mt-2 text-[18px] text-[var(--color-sage-mist)]">
            {profile.level} · เป้าหมาย {career?.title ?? '—'}
          </p>
        </div>
        <div className="text-right">
          <span className="mono-tag-ghost">LEVEL · {lvl.toString().padStart(2, '0')}</span>
        </div>
      </header>

      <BentoGrid>
        {/* Hero card: Level + EXP */}
        <BentoCard variant="dark" span="lg:col-span-8 lg:row-span-2">
          <div className="flex h-full flex-col justify-between gap-10">
            <div>
              <span className="mono-tag inline-flex">SCHOLAR PROGRESS</span>
              <div
                className="mt-8"
                style={{
                  fontFamily: 'var(--font-aspekta)',
                  fontSize: 'clamp(64px, 8vw, 111px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                LEVEL {lvl}
              </div>
              <p className="mt-4 text-[18px] text-[var(--color-sage-mist)]">
                {prog.current} / {prog.next} EXP ในเลเวลนี้
              </p>
            </div>
            <div>
              <div className="h-[12px] w-full overflow-hidden rounded-[8px] border border-[var(--color-fog)]">
                <div
                  className="h-full bg-[var(--color-bio-green)] transition-[width] duration-500"
                  style={{ width: `${prog.pct * 100}%` }}
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between text-[13px] text-[var(--color-sage-mist)]"
                style={{ fontFamily: 'var(--font-roboto-mono)' }}>
                <span>TOTAL · {xp} EXP</span>
                <span>NEXT · LV {lvl + 1}</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* TCAS Countdown */}
        <BentoCard variant="cloud" span="lg:col-span-4 lg:row-span-2">
          <span className="mono-tag inline-flex">TCAS COUNTDOWN</span>
          <p className="mt-6 text-[15px]" style={{ color: 'var(--color-fog)' }}>
            {target.label}
          </p>
          <div className="mt-6 grid grid-cols-4 gap-2 text-center">
            {[
              ['DAYS', parts.days],
              ['HRS', parts.hours],
              ['MIN', parts.minutes],
              ['SEC', parts.seconds],
            ].map(([label, val]) => (
              <div key={label as string} className="rounded-[8px] border border-[var(--color-sage-mist)] py-4">
                <div
                  style={{
                    fontFamily: 'var(--font-aspekta)',
                    fontSize: 36,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-carbon)',
                  }}
                >
                  {String(val).padStart(2, '0')}
                </div>
                <div
                  className="mt-1 text-[11px]"
                  style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-fog)' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-[13px]" style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-fog)' }}>
            TARGET · {new Date(target.date).toLocaleDateString('th-TH')}
          </div>
        </BentoCard>

        {/* Nav cards */}
        <BentoNav span="lg:col-span-4" tag="01 / ROADMAP" title="แผนการเรียน" subtitle={`${completedNodeIds.length}/${ROADMAP_NODES.length} ขั้นสำเร็จ`} to="/roadmap" />
        <BentoNav span="lg:col-span-4" tag="02 / SIMULATION" title="จำลองอาชีพ" subtitle={`${simulationResults.length} ครั้งที่ทดลอง · ${SCENARIOS.length} โมดูล`} to="/simulation" />
        <BentoNav span="lg:col-span-4" tag="03 / PORTFOLIO" title="พอร์ตโฟลิโอ" subtitle={`${portfolioEntries.length} รายการสะสม`} to="/portfolio" />

        {/* Skill radar mini */}
        <BentoCard variant="cloud" span="lg:col-span-7">
          <span className="mono-tag inline-flex">SKILL RADAR</span>
          <div className="mt-6">
            <SkillRadar data={data} height={280} />
          </div>
        </BentoCard>

        {/* Readiness summary */}
        <BentoCard variant="light" span="lg:col-span-5">
          <span className="mono-tag inline-flex">READINESS · ต่อมหาวิทยาลัย</span>
          <ul className="mt-6 space-y-4">
            {(surveys.universityIds.length ? surveys.universityIds : UNIVERSITIES.slice(0, 2).map((u) => u.id)).map(
              (id) => {
                const r = readinessFor({
                  universityId: id,
                  surveys,
                  completedNodeIds,
                  simulationResults,
                  portfolioEntries,
                });
                if (!r.university) return null;
                const passed = r.total >= r.threshold;
                return (
                  <li key={id} className="border-b border-[var(--color-sage-mist)] pb-4 last:border-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div style={{ fontFamily: 'var(--font-aspekta)', fontSize: 22, color: 'var(--color-carbon)' }}>
                          {r.university.name}
                        </div>
                        <div className="text-[14px]" style={{ color: 'var(--color-fog)' }}>
                          {r.university.program} · เกณฑ์ {r.threshold}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-roboto-mono)',
                          fontSize: 28,
                          color: passed ? 'var(--color-deep-sea)' : 'var(--color-carbon)',
                        }}
                      >
                        {r.total.toFixed(0)}
                      </div>
                    </div>
                    <div className="mt-3 h-[6px] overflow-hidden rounded-[8px] bg-[var(--color-sage-mist)]">
                      <div
                        className="h-full bg-[var(--color-bio-green)]"
                        style={{ width: `${Math.min(100, r.total)}%` }}
                      />
                    </div>
                  </li>
                );
              },
            )}
          </ul>
        </BentoCard>
      </BentoGrid>
    </div>
  );
}

function BentoNav({
  span,
  tag,
  title,
  subtitle,
  to,
}: {
  span: string;
  tag: string;
  title: string;
  subtitle: string;
  to: string;
}) {
  return (
    <div className={span}>
      <Link to={to} className="block h-full">
        <div className="bento-card cursor-pointer transition-colors hover:border-[var(--color-bio-green)]">
          <span className="mono-tag inline-flex">{tag}</span>
          <h3
            className="mt-6"
            style={{ fontFamily: 'var(--font-aspekta)', fontSize: 42, letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            {title}
          </h3>
          <p className="mt-4 text-[16px]" style={{ color: 'var(--color-fog)' }}>
            {subtitle}
          </p>
          <div
            className="mt-6 flex items-center gap-2 text-[13px]"
            style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-carbon)' }}
          >
            ENTER →
          </div>
        </div>
      </Link>
    </div>
  );
}
