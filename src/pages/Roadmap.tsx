import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';
import ChatPanel from '@/components/roadmap/ChatPanel';

export default function Roadmap() {
  return (
    <div className="space-y-6">
      <header>
        <span className="mono-tag-ghost mb-3 inline-flex">EXECUTION LAYER</span>
        <h1
          className="mt-3"
          style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.05 }}
        >
          แผนการเรียน &amp; AI Copilot
        </h1>
        <p className="mt-2 text-[18px] text-[var(--color-sage-mist)]">
          อัปเดตความคืบหน้าผ่านแชต — Roadmap ฝั่งซ้ายจะอัปเดตทันที
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RoadmapTimeline />
        </div>
        <div className="lg:col-span-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
          <div className="h-[640px]">
            <ChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
