import type { University } from '@/lib/types';

export const UNIVERSITIES: University[] = [
  {
    id: 'cu-eng',
    name: 'จุฬาลงกรณ์มหาวิทยาลัย',
    program: 'วิศวกรรมศาสตร์',
    minScore: 75,
    weights: { logic: 0.4, science: 0.35, discipline: 0.25 },
    round1ThresholdPortfolio: 78,
  },
  {
    id: 'tu-bba',
    name: 'มหาวิทยาลัยธรรมศาสตร์',
    program: 'BBA นานาชาติ',
    minScore: 70,
    weights: { language: 0.4, logic: 0.3, empathy: 0.3 },
    round1ThresholdPortfolio: 72,
  },
  {
    id: 'mu-med',
    name: 'มหาวิทยาลัยมหิดล',
    program: 'แพทยศาสตร์',
    minScore: 85,
    weights: { science: 0.4, empathy: 0.3, discipline: 0.3 },
    round1ThresholdPortfolio: 88,
  },
  {
    id: 'ku-sci',
    name: 'มหาวิทยาลัยเกษตรศาสตร์',
    program: 'วิทยาศาสตร์',
    minScore: 65,
    weights: { science: 0.5, logic: 0.3, discipline: 0.2 },
    round1ThresholdPortfolio: 68,
  },
  {
    id: 'kmitl-it',
    name: 'สถาบันเทคโนโลยีพระจอมเกล้าฯ ลาดกระบัง',
    program: 'เทคโนโลยีสารสนเทศ',
    minScore: 70,
    weights: { logic: 0.45, science: 0.25, creativity: 0.3 },
    round1ThresholdPortfolio: 72,
  },
];

export function getUniversity(id: string): University | undefined {
  return UNIVERSITIES.find((u) => u.id === id);
}
