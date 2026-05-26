import { ROADMAP_NODES, isUnlocked } from '@/data/roadmap-nodes';
import type { ChatMessage, RoadmapNode } from './types';
import { uid } from './store';

export interface CopilotResult {
  reply: ChatMessage;
  actions: CopilotAction[];
}

export type CopilotAction =
  | { type: 'mark-done'; nodeId: string; expReward: number }
  | { type: 'noop' };

const COMPLETION_RE = /(เสร็จ|ทำเสร็จ|ทำไปแล้ว|จบแล้ว|finished|done|completed|จัดการแล้ว|ผ่าน)/i;
const NEXT_RE = /(ทำอะไรต่อ|next|แนะนำ|step ต่อ|ต่อไป|ถัดไป)/i;
const STATUS_RE = /(สถานะ|status|progress|ฉันถึงไหน)/i;

function findCandidateNode(input: string, nodes: RoadmapNode[]): RoadmapNode | undefined {
  const norm = input.toLowerCase();
  return nodes.find((n) => n.keywords.some((kw) => norm.includes(kw.toLowerCase())));
}

function nextUnlockedNode(completed: string[]): RoadmapNode | undefined {
  return ROADMAP_NODES.find((n) => !completed.includes(n.id) && isUnlocked(n, completed));
}

function reply(text: string): ChatMessage {
  return { id: uid('msg'), role: 'copilot', text, ts: new Date().toISOString() };
}

export function parse(args: {
  input: string;
  completedNodeIds: string[];
}): CopilotResult {
  const { input, completedNodeIds } = args;

  if (NEXT_RE.test(input)) {
    const next = nextUnlockedNode(completedNodeIds);
    if (next) {
      return {
        reply: reply(
          `ลองทำ "${next.title}" ต่อเลย จะได้รับ +${next.expReward} EXP เมื่อสำเร็จ`
        ),
        actions: [{ type: 'noop' }],
      };
    }
    return {
      reply: reply('โหดมาก ทุกบทผ่านหมดแล้ว — ลองวนทำข้อสอบจำลองอีกชุดดูได้นะ'),
      actions: [{ type: 'noop' }],
    };
  }

  if (STATUS_RE.test(input)) {
    return {
      reply: reply(
        `ตอนนี้ทำสำเร็จ ${completedNodeIds.length}/${ROADMAP_NODES.length} ขั้น`
      ),
      actions: [{ type: 'noop' }],
    };
  }

  if (COMPLETION_RE.test(input)) {
    const candidate = findCandidateNode(input, ROADMAP_NODES);
    if (!candidate) {
      return {
        reply: reply('ระบุชื่อภารกิจหน่อยได้มั้ย? เช่น "ทำคำศัพท์ 1000 คำเสร็จแล้ว"'),
        actions: [{ type: 'noop' }],
      };
    }
    if (completedNodeIds.includes(candidate.id)) {
      return {
        reply: reply(`"${candidate.title}" เคยทำสำเร็จไปแล้ว ลองภารกิจถัดไปดู`),
        actions: [{ type: 'noop' }],
      };
    }
    if (!isUnlocked(candidate, completedNodeIds)) {
      const missing = candidate.prereqIds
        .filter((p) => !completedNodeIds.includes(p))
        .map((p) => ROADMAP_NODES.find((n) => n.id === p)?.title)
        .filter(Boolean)
        .join(', ');
      return {
        reply: reply(
          `"${candidate.title}" ยังต้องทำ ${missing} ให้เสร็จก่อนนะ`
        ),
        actions: [{ type: 'noop' }],
      };
    }
    return {
      reply: reply(
        `เยี่ยมมาก! บันทึก "${candidate.title}" ให้แล้ว ได้รับ +${candidate.expReward} EXP`
      ),
      actions: [{ type: 'mark-done', nodeId: candidate.id, expReward: candidate.expReward }],
    };
  }

  return {
    reply: reply(
      'รับทราบครับ ลองพิมพ์ว่า "ทำ X เสร็จแล้ว" หรือถาม "ทำอะไรต่อดี" ได้เลย'
    ),
    actions: [{ type: 'noop' }],
  };
}
