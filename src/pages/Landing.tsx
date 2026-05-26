import { Link } from 'react-router-dom';
import { useStore } from '@/lib/store';

export default function Landing() {
  const profile = useStore((s) => s.profile);
  return (
    <div className="min-h-screen bg-[var(--color-midnight-ink)] text-[var(--color-polar-white)]">
      <header className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-6">
        <span className="mono-tag">ZERO / GAP</span>
        <span
          className="text-[14px] text-[var(--color-fog)]"
          style={{ fontFamily: 'var(--font-roboto-mono)' }}
        >
          v0.1 · MOCK
        </span>
      </header>
      <section className="mx-auto max-w-[1280px] px-6 pt-16 pb-24">
        <span className="mono-tag-ghost mb-8 inline-flex">CAREER · TCAS · SKILL NAVIGATOR</span>
        <h1
          className="mt-6 max-w-4xl"
          style={{
            fontFamily: 'var(--font-aspekta)',
            fontSize: 'clamp(48px, 8vw, 111px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          เปลี่ยนการเตรียมเข้ามหาวิทยาลัย
          <br />
          ให้กลายเป็น <em style={{ fontStyle: 'normal', color: 'var(--color-bio-green)' }}>ภารกิจที่จับต้องได้</em>
        </h1>
        <p
          className="mt-10 max-w-2xl text-[var(--color-sage-mist)]"
          style={{ fontFamily: 'var(--font-aspekta)', fontSize: 22, lineHeight: 1.4, letterSpacing: '-0.006em' }}
        >
          แดชบอร์ดสำหรับนักเรียนไทยที่กำลังเตรียม TCAS — รวมเป้าหมาย คะแนนสอบ
          และการพัฒนาทักษะไว้ในโครงเดียว มี AI Copilot ช่วยติดตามทุกความคืบหน้า
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          {profile ? (
            <Link to="/dashboard" className="btn btn-accent">
              เข้าสู่แดชบอร์ดของฉัน
            </Link>
          ) : (
            <Link to="/onboarding/level" className="btn btn-accent">
              เริ่มสำรวจตัวเอง · 4 ขั้นตอน
            </Link>
          )}
          <Link to="/onboarding/level" className="btn btn-ghost">
            ทำใหม่อีกครั้ง
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              tag: '01 / DISCOVER',
              title: 'แบบสำรวจ 4 ขั้น',
              body: 'ระบุระดับ ม.ปลาย อาชีพเป้าหมาย คณะที่อยากเข้า และทรัพยากรที่มี',
            },
            {
              tag: '02 / ROADMAP',
              title: 'แผนการเรียนเชิงโต้ตอบ',
              body: 'ไทม์ไลน์ของโหนดความรู้ที่ปลดล็อกตามลำดับ พร้อม AI Copilot คอยอัปเดต',
            },
            {
              tag: '03 / READINESS',
              title: 'คะแนนพร้อมสอบ',
              body: 'รวม Skill Gap, Portfolio และผลการจำลองอาชีพเป็นค่าเดียว',
            },
          ].map((card) => (
            <article
              key={card.tag}
              className="rounded-[40px] border border-[var(--color-fog)] bg-[var(--color-carbon)] p-10"
            >
              <span className="mono-tag mb-6 inline-flex">{card.tag}</span>
              <h3
                className="mt-6"
                style={{ fontFamily: 'var(--font-aspekta)', fontSize: 42, letterSpacing: '-0.02em', lineHeight: 1.1 }}
              >
                {card.title}
              </h3>
              <p
                className="mt-6 text-[var(--color-sage-mist)]"
                style={{ fontFamily: 'var(--font-aspekta)', fontSize: 18, lineHeight: 1.4 }}
              >
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
