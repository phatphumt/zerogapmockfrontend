// TCAS69 round-1 (Portfolio) opens roughly Nov 2 each cycle.
// Source of truth lives here; swap when official calendar updates.
export const TCAS_TARGETS = [
  { id: 'round1-portfolio', label: 'TCAS รอบ 1 (Portfolio)', date: '2026-11-02T00:00:00+07:00' },
  { id: 'round2-quota', label: 'TCAS รอบ 2 (โควตา)', date: '2027-02-15T00:00:00+07:00' },
  { id: 'round3-admission', label: 'TCAS รอบ 3 (Admission)', date: '2027-05-06T00:00:00+07:00' },
];

export function nextTcasTarget(now: Date = new Date()) {
  const upcoming = TCAS_TARGETS.find((t) => new Date(t.date) > now);
  return upcoming ?? TCAS_TARGETS[TCAS_TARGETS.length - 1];
}

export function diffParts(target: Date, now: Date = new Date()) {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}
