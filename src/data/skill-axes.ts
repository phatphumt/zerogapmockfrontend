import type { SkillAxis } from '@/lib/types';

export const SKILL_AXES: { id: SkillAxis; label: string; short: string }[] = [
  { id: 'logic', label: 'ตรรกะ', short: 'LOGIC' },
  { id: 'language', label: 'ภาษา', short: 'LANG' },
  { id: 'science', label: 'วิทยาศาสตร์', short: 'SCI' },
  { id: 'empathy', label: 'มนุษยสัมพันธ์', short: 'EMPA' },
  { id: 'creativity', label: 'ความคิดสร้างสรรค์', short: 'CREA' },
  { id: 'discipline', label: 'วินัย', short: 'DISC' },
];
