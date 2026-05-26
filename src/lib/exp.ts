// Level math: level = floor(sqrt(xp / 50)) + 1.
// xp(level) = (level - 1)^2 * 50  → rises 0, 50, 200, 450, 800, 1250...
export function levelFromXp(xp: number): number {
  if (xp <= 0) return 1;
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

export function xpForLevel(level: number): number {
  return (level - 1) ** 2 * 50;
}

export function progressInLevel(xp: number): { current: number; next: number; pct: number } {
  const lvl = levelFromXp(xp);
  const current = xp - xpForLevel(lvl);
  const next = xpForLevel(lvl + 1) - xpForLevel(lvl);
  return { current, next, pct: Math.min(1, current / next) };
}
