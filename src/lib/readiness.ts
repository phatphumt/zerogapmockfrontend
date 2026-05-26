import { ROADMAP_NODES } from '@/data/roadmap-nodes';
import { getUniversity } from '@/data/universities';
import type { PortfolioEntry, ReadinessBreakdown, SimResult, SkillVector, University } from './types';
import { currentVector } from './skills';

function avg(v: SkillVector): number {
  return (v.logic + v.language + v.science + v.empathy + v.creativity + v.discipline) / 6;
}

function weightedAvg(v: SkillVector, weights: Partial<SkillVector>): number {
  const entries = Object.entries(weights) as [keyof SkillVector, number][];
  if (entries.length === 0) return avg(v);
  let total = 0;
  let wsum = 0;
  for (const [k, w] of entries) {
    total += v[k] * w;
    wsum += w;
  }
  return wsum === 0 ? avg(v) : total / wsum;
}

export function readinessFor(args: {
  universityId: string;
  surveys: any;
  completedNodeIds: string[];
  simulationResults: SimResult[];
  portfolioEntries: PortfolioEntry[];
}): ReadinessBreakdown & { university: University | undefined; threshold: number } {
  const uni = getUniversity(args.universityId);
  const v = currentVector({
    surveys: args.surveys,
    completedNodeIds: args.completedNodeIds,
    simulationResults: args.simulationResults,
  });

  const skillScore = uni ? weightedAvg(v, uni.weights) : avg(v);
  const portfolioWeightSum = args.portfolioEntries.reduce((acc, e) => acc + e.weight, 0);
  const portfolio = clamp((portfolioWeightSum / 25) * 100, 0, 100);
  const simulation = clamp(args.simulationResults.length * 12, 0, 100);
  const roadmap = (args.completedNodeIds.length / Math.max(1, ROADMAP_NODES.length)) * 100;

  const total = clamp(
    0.4 * skillScore + 0.3 * portfolio + 0.2 * simulation + 0.1 * roadmap,
    0,
    100
  );

  return {
    skills: round(skillScore),
    portfolio: round(portfolio),
    simulation: round(simulation),
    roadmap: round(roadmap),
    total: round(total),
    university: uni,
    threshold: uni?.round1ThresholdPortfolio ?? 70,
  };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
function round(n: number) {
  return Math.round(n * 10) / 10;
}
