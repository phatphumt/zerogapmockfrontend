import { CAREERS } from '@/data/careers';
import { ROADMAP_NODES } from '@/data/roadmap-nodes';
import { SKILL_AXES } from '@/data/skill-axes';
import type { SimResult, SkillAxis, SkillVector, SurveyResponses } from './types';

const ZERO_VECTOR: SkillVector = {
  logic: 0, language: 0, science: 0, empathy: 0, creativity: 0, discipline: 0,
};

// Initial baseline derived from level + assets the student already has.
export function baselineFromSurvey(survey: SurveyResponses): SkillVector {
  const base = survey.level === 'ม.6' ? 50 : survey.level === 'ม.5' ? 40 : 30;
  const v: SkillVector = { ...ZERO_VECTOR, logic: base, language: base, science: base, empathy: base, creativity: base, discipline: base };
  // Asset bumps
  if (survey.assets.includes('gat')) v.logic += 8;
  if (survey.assets.includes('pat1')) v.logic += 6;
  if (survey.assets.includes('ielts')) v.language += 12;
  if (survey.assets.includes('a-level-bio')) v.science += 8;
  if (survey.assets.includes('a-level-chem')) v.science += 6;
  if (survey.assets.includes('volunteer')) v.empathy += 8;
  if (survey.assets.includes('competition')) v.creativity += 6;
  return v;
}

export function applyDeltas(base: SkillVector, deltas: Partial<SkillVector>): SkillVector {
  const out = { ...base };
  for (const k of Object.keys(deltas) as SkillAxis[]) {
    out[k] = clamp(base[k] + (deltas[k] ?? 0), 0, 100);
  }
  return out;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

// Derived current vector = baseline + completed-node bumps + sim deltas.
export function currentVector(args: {
  surveys: SurveyResponses;
  completedNodeIds: string[];
  simulationResults: SimResult[];
}): SkillVector {
  const base = baselineFromSurvey(args.surveys);
  let v = { ...base };
  for (const id of args.completedNodeIds) {
    const node = ROADMAP_NODES.find((n) => n.id === id);
    if (node) v = applyDeltas(v, { [node.axisFocus]: 5 });
  }
  for (const r of args.simulationResults) {
    v = applyDeltas(v, r.deltas);
  }
  return v;
}

export function targetVector(careerId?: string): SkillVector {
  const c = CAREERS.find((c) => c.id === careerId);
  return c?.target ?? { logic: 70, language: 70, science: 70, empathy: 70, creativity: 70, discipline: 70 };
}

export function radarSeries(current: SkillVector, target: SkillVector) {
  return SKILL_AXES.map((a) => ({
    axis: a.label,
    current: current[a.id],
    target: target[a.id],
  }));
}
