import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface Datum {
  axis: string;
  current: number;
  target: number;
}

export default function SkillRadar({ data, height = 360 }: { data: Datum[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="78%">
        <PolarGrid stroke="rgba(34,47,48,0.18)" />
        <PolarAngleAxis
          dataKey="axis"
          tick={{ fontFamily: 'var(--font-aspekta)', fontSize: 14, fill: 'var(--color-carbon)' }}
        />
        <PolarRadiusAxis
          domain={[0, 100]}
          tickCount={5}
          tick={{ fontFamily: 'var(--font-roboto-mono)', fontSize: 11, fill: 'var(--color-fog)' }}
          stroke="rgba(34,47,48,0.12)"
        />
        <Radar
          name="ปัจจุบัน"
          dataKey="current"
          stroke="var(--color-carbon)"
          fill="var(--color-carbon)"
          fillOpacity={0.18}
          strokeWidth={2}
        />
        <Radar
          name="เป้าหมาย"
          dataKey="target"
          stroke="var(--color-bio-green)"
          fill="var(--color-bio-green)"
          fillOpacity={0.35}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--color-carbon)',
            border: '1px solid var(--color-fog)',
            borderRadius: 8,
            fontFamily: 'var(--font-aspekta)',
            color: 'var(--color-polar-white)',
          }}
          labelStyle={{ color: 'var(--color-bio-green)' }}
        />
        <Legend
          wrapperStyle={{
            fontFamily: 'var(--font-roboto-mono)',
            fontSize: 13,
            color: 'var(--color-carbon)',
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
