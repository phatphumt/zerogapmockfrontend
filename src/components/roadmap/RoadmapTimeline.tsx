import { ROADMAP_NODES, isUnlocked } from '@/data/roadmap-nodes';
import { useStore } from '@/lib/store';

type NodeState = 'locked' | 'active' | 'done';

const NODE_R = 16;
const ROW_H = 110;
const PADDING_TOP = 40;

export default function RoadmapTimeline() {
  const completed = useStore((s) => s.completedNodeIds);

  const nodes = ROADMAP_NODES.map((n) => {
    let state: NodeState;
    if (completed.includes(n.id)) state = 'done';
    else if (isUnlocked(n, completed)) state = 'active';
    else state = 'locked';
    return { ...n, state };
  });

  const totalH = PADDING_TOP * 2 + (nodes.length - 1) * ROW_H;

  return (
    <div className="rounded-[40px] border border-[var(--color-sage-mist)] bg-[var(--color-cloud-canvas)] p-10 text-[var(--color-carbon)]">
      <div className="mb-8 flex items-center justify-between">
        <span className="mono-tag">LEARNING TIMELINE</span>
        <span
          className="text-[13px]"
          style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-fog)' }}
        >
          {completed.length} / {ROADMAP_NODES.length} DONE
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 600 ${totalH}`}
          width="100%"
          height={totalH}
          className="block"
          aria-hidden
        >
          {/* spine */}
          <line
            x1={40}
            y1={PADDING_TOP}
            x2={40}
            y2={totalH - PADDING_TOP}
            stroke="var(--color-sage-mist)"
            strokeWidth={2}
            strokeDasharray="2 6"
          />

          {nodes.map((n, i) => {
            const cy = PADDING_TOP + i * ROW_H;
            const isDone = n.state === 'done';
            const isActive = n.state === 'active';
            const fill = isDone
              ? 'var(--color-bio-green)'
              : 'var(--color-cloud-canvas)';
            const stroke = isDone
              ? 'var(--color-carbon)'
              : isActive
                ? 'var(--color-carbon)'
                : 'var(--color-fog)';
            return (
              <g key={n.id} opacity={n.state === 'locked' ? 0.55 : 1}>
                {isActive && (
                  <circle
                    cx={40}
                    cy={cy}
                    r={NODE_R + 6}
                    fill="none"
                    stroke="var(--color-bio-green)"
                    strokeWidth={2}
                  />
                )}
                <circle cx={40} cy={cy} r={NODE_R} fill={fill} stroke={stroke} strokeWidth={2} />
                {isDone && (
                  <path
                    d={`M ${40 - 7} ${cy} l 5 5 l 10 -10`}
                    stroke="var(--color-carbon)"
                    strokeWidth={2.5}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                {!isDone && !isActive && (
                  <path
                    d={`M ${40 - 5} ${cy - 3} h 10 M ${40 - 5} ${cy + 3} h 10`}
                    stroke="var(--color-fog)"
                    strokeWidth={2}
                  />
                )}
                <text
                  x={80}
                  y={cy - 2}
                  fill="var(--color-carbon)"
                  fontFamily="var(--font-aspekta)"
                  fontSize={20}
                  letterSpacing="-0.006em"
                  fontWeight={isDone || isActive ? 600 : 400}
                >
                  {n.title}
                </text>
                <text
                  x={80}
                  y={cy + 22}
                  fill="var(--color-fog)"
                  fontFamily="var(--font-aspekta)"
                  fontSize={14}
                >
                  {n.description}
                </text>
                <g transform={`translate(80, ${cy + 38})`}>
                  <rect
                    width={isDone ? 88 : 70}
                    height={22}
                    rx={6}
                    fill={isDone ? 'var(--color-bio-green)' : 'transparent'}
                    stroke={isDone ? 'transparent' : 'var(--color-sage-mist)'}
                  />
                  <text
                    x={10}
                    y={15}
                    fill="var(--color-carbon)"
                    fontFamily="var(--font-roboto-mono)"
                    fontSize={11}
                  >
                    {isDone ? `+${n.expReward} EXP ✓` : `+${n.expReward} EXP`}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
