export type Level = 'ม.4' | 'ม.5' | 'ม.6';

export interface Profile {
  name: string;
  level: Level;
  createdAt: string;
}

export interface SurveyResponses {
  level?: Level;
  careerId?: string;
  universityIds: string[];
  assets: string[];
}

export interface SkillVector {
  logic: number;
  language: number;
  science: number;
  empathy: number;
  creativity: number;
  discipline: number;
}

export type SkillAxis = keyof SkillVector;

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  expReward: number;
  prereqIds: string[];
  keywords: string[];
  axisFocus: SkillAxis;
}

export interface PortfolioEntry {
  id: string;
  kind: 'cert' | 'project' | 'competition';
  title: string;
  org: string;
  year: number;
  weight: 1 | 2 | 3 | 4 | 5;
}

export interface SimResult {
  moduleId: string;
  finishedAt: string;
  deltas: Partial<SkillVector>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'copilot';
  text: string;
  ts: string;
}

export interface University {
  id: string;
  name: string;
  program: string;
  minScore: number;
  weights: Partial<SkillVector>;
  round1ThresholdPortfolio: number;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  target: SkillVector;
}

export interface ScenarioChoice {
  id: string;
  label: string;
  deltas: Partial<SkillVector>;
}

export interface ScenarioCard {
  id: string;
  prompt: string;
  choices: ScenarioChoice[];
}

export interface ScenarioModule {
  id: string;
  title: string;
  description: string;
  cards: ScenarioCard[];
}

export interface ReadinessBreakdown {
  skills: number;
  portfolio: number;
  simulation: number;
  roadmap: number;
  total: number;
}
