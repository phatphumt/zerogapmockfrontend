import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  ChatMessage,
  PortfolioEntry,
  Profile,
  SimResult,
  SurveyResponses,
} from './types';

interface ZeroGapState {
  profile: Profile | null;
  surveys: SurveyResponses;
  xp: number;
  completedNodeIds: string[];
  portfolioEntries: PortfolioEntry[];
  simulationResults: SimResult[];
  messages: ChatMessage[];

  // Actions
  saveProfile: (profile: Profile) => void;
  updateSurveys: (patch: Partial<SurveyResponses>) => void;
  awardXp: (amount: number) => void;
  markNodeDone: (id: string) => void;
  addPortfolioEntry: (entry: PortfolioEntry) => void;
  removePortfolioEntry: (id: string) => void;
  recordSimResult: (result: SimResult) => void;
  pushChat: (msg: ChatMessage) => void;
  resetAll: () => void;
}

const initialSurveys: SurveyResponses = {
  level: undefined,
  careerId: undefined,
  universityIds: [],
  assets: [],
};

export const useStore = create<ZeroGapState>()(
  persist(
    (set) => ({
      profile: null,
      surveys: initialSurveys,
      xp: 0,
      completedNodeIds: [],
      portfolioEntries: [],
      simulationResults: [],
      messages: [],

      saveProfile: (profile) => set({ profile }),
      updateSurveys: (patch) =>
        set((s) => ({ surveys: { ...s.surveys, ...patch } })),
      awardXp: (amount) => set((s) => ({ xp: s.xp + amount })),
      markNodeDone: (id) =>
        set((s) =>
          s.completedNodeIds.includes(id)
            ? s
            : { completedNodeIds: [...s.completedNodeIds, id] }
        ),
      addPortfolioEntry: (entry) =>
        set((s) => ({ portfolioEntries: [...s.portfolioEntries, entry] })),
      removePortfolioEntry: (id) =>
        set((s) => ({
          portfolioEntries: s.portfolioEntries.filter((e) => e.id !== id),
        })),
      recordSimResult: (result) =>
        set((s) => ({ simulationResults: [...s.simulationResults, result] })),
      pushChat: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      resetAll: () =>
        set({
          profile: null,
          surveys: initialSurveys,
          xp: 0,
          completedNodeIds: [],
          portfolioEntries: [],
          simulationResults: [],
          messages: [],
        }),
    }),
    {
      name: 'zerogap',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
