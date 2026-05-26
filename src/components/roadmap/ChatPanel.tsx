import { useEffect, useRef, useState } from 'react';
import { parse } from '@/lib/copilot';
import { useStore, uid } from '@/lib/store';

export default function ChatPanel() {
  const messages = useStore((s) => s.messages);
  const completed = useStore((s) => s.completedNodeIds);
  const pushChat = useStore((s) => s.pushChat);
  const markNodeDone = useStore((s) => s.markNodeDone);
  const awardXp = useStore((s) => s.awardXp);

  const [draft, setDraft] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      pushChat({
        id: uid('msg'),
        role: 'copilot',
        text: 'สวัสดี! บอกฉันได้เลยว่าเพิ่งทำภารกิจอะไรเสร็จ — หรือพิมพ์ "ทำอะไรต่อดี" เพื่อดูคำแนะนำ',
        ts: new Date().toISOString(),
      });
    }
  }, [messages.length, pushChat]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    pushChat({ id: uid('msg'), role: 'user', text, ts: new Date().toISOString() });

    const result = parse({ input: text, completedNodeIds: completed });
    pushChat(result.reply);
    for (const a of result.actions) {
      if (a.type === 'mark-done') {
        markNodeDone(a.nodeId);
        awardXp(a.expReward);
      }
    }
  }

  return (
    <div className="flex h-full flex-col rounded-[40px] border border-[var(--color-fog)] bg-[var(--color-carbon)] p-8 text-[var(--color-polar-white)]">
      <div className="mb-6 flex items-center justify-between">
        <span className="mono-tag">AI COPILOT</span>
        <span className="text-[13px]" style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-sage-mist)' }}>
          SCRIPTED · MOCK
        </span>
      </div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto pr-2">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div key={m.id} className={['flex', isUser ? 'justify-end' : 'justify-start'].join(' ')}>
              <div
                className={[
                  'max-w-[85%] rounded-[20px] border px-5 py-3',
                  isUser
                    ? 'border-[var(--color-bio-green)] bg-[var(--color-bio-green)] text-[var(--color-carbon)]'
                    : 'border-[var(--color-fog)] bg-[var(--color-midnight-ink)] text-[var(--color-polar-white)]',
                ].join(' ')}
                style={{ fontFamily: 'var(--font-aspekta)', fontSize: 17, lineHeight: 1.4 }}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {['ทำคำศัพท์ 1000 คำเสร็จแล้ว', 'ทำอะไรต่อดี', 'สถานะของฉัน'].map((sg) => (
            <button
              key={sg}
              onClick={() => setDraft(sg)}
              className="rounded-[8px] border border-[var(--color-fog)] px-3 py-1 text-[13px] text-[var(--color-sage-mist)] hover:border-[var(--color-bio-green)] hover:text-[var(--color-polar-white)] cursor-pointer"
              style={{ fontFamily: 'var(--font-roboto-mono)' }}
            >
              {sg}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send();
            }}
            placeholder="พิมพ์ความคืบหน้าของคุณ..."
            className="input input-dark flex-1"
            aria-label="Chat input"
          />
          <button onClick={send} className="btn btn-accent" disabled={!draft.trim()}>
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
}
