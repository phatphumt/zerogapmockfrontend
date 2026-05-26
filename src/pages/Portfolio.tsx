import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore, uid } from '@/lib/store';
import { UNIVERSITIES } from '@/data/universities';
import { readinessFor } from '@/lib/readiness';
import type { PortfolioEntry } from '@/lib/types';

const schema = z.object({
  kind: z.enum(['cert', 'project', 'competition']),
  title: z.string().min(2, 'อย่างน้อย 2 ตัวอักษร'),
  org: z.string().min(2, 'ใส่ชื่อหน่วยงาน'),
  year: z.coerce.number().int().min(2000).max(2100),
  weight: z.coerce.number().int().min(1).max(5),
});
type FormValues = z.infer<typeof schema>;

const KIND_LABEL: Record<PortfolioEntry['kind'], string> = {
  cert: 'ใบประกาศนียบัตร',
  project: 'โปรเจกต์',
  competition: 'การแข่งขัน',
};

export default function Portfolio() {
  const surveys = useStore((s) => s.surveys);
  const completedNodeIds = useStore((s) => s.completedNodeIds);
  const simulationResults = useStore((s) => s.simulationResults);
  const portfolioEntries = useStore((s) => s.portfolioEntries);
  const addPortfolioEntry = useStore((s) => s.addPortfolioEntry);
  const removePortfolioEntry = useStore((s) => s.removePortfolioEntry);

  const [editing] = useState<PortfolioEntry | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      kind: 'cert',
      title: '',
      org: '',
      year: new Date().getFullYear(),
      weight: 3,
    },
  });

  function onSubmit(values: FormValues) {
    addPortfolioEntry({
      id: editing?.id ?? uid('pf'),
      kind: values.kind,
      title: values.title,
      org: values.org,
      year: values.year,
      weight: values.weight as PortfolioEntry['weight'],
    });
    reset();
  }

  const targets = surveys.universityIds.length
    ? surveys.universityIds
    : UNIVERSITIES.slice(0, 2).map((u) => u.id);

  return (
    <div className="space-y-8">
      <header>
        <span className="mono-tag-ghost mb-3 inline-flex">PORTFOLIO PLANNER</span>
        <h1
          className="mt-3"
          style={{ fontFamily: 'var(--font-aspekta)', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1.05 }}
        >
          เตรียมพอร์ตสำหรับ TCAS รอบ 1
        </h1>
        <p className="mt-2 text-[18px] text-[var(--color-sage-mist)]">
          เพิ่มผลงาน ใบประกาศ และการแข่งขัน — Readiness Score จะปรับตามค่าน้ำหนัก
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-[40px] border border-[var(--color-fog)] bg-[var(--color-carbon)] p-10 text-[var(--color-polar-white)] lg:col-span-2"
        >
          <span className="mono-tag inline-flex">ADD ENTRY</span>

          <div className="mt-6 space-y-5">
            <Field label="ประเภท" error={errors.kind?.message}>
              <select {...register('kind')} className="input input-dark">
                <option value="cert">ใบประกาศนียบัตร</option>
                <option value="project">โปรเจกต์</option>
                <option value="competition">การแข่งขัน</option>
              </select>
            </Field>
            <Field label="ชื่อผลงาน" error={errors.title?.message}>
              <input {...register('title')} className="input input-dark" placeholder="เช่น Junior Code Camp" />
            </Field>
            <Field label="หน่วยงาน / ผู้จัด" error={errors.org?.message}>
              <input {...register('org')} className="input input-dark" placeholder="เช่น สสวท." />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="ปี (พ.ศ./ค.ศ.)" error={errors.year?.message}>
                <input type="number" {...register('year')} className="input input-dark" />
              </Field>
              <Field label="น้ำหนัก (1-5)" error={errors.weight?.message}>
                <input type="number" min={1} max={5} {...register('weight')} className="input input-dark" />
              </Field>
            </div>
          </div>

          <button disabled={isSubmitting} className="btn btn-accent mt-8 w-full">
            บันทึกและคำนวณคะแนนใหม่
          </button>
        </form>

        {/* Entry list + readiness */}
        <div className="space-y-6 lg:col-span-3">
          <div className="rounded-[40px] border border-[var(--color-sage-mist)] bg-[var(--color-cloud-canvas)] p-10 text-[var(--color-carbon)]">
            <span className="mono-tag inline-flex">YOUR ENTRIES · {portfolioEntries.length}</span>
            {portfolioEntries.length === 0 ? (
              <p className="mt-6 text-[18px]" style={{ color: 'var(--color-fog)' }}>
                ยังไม่มีรายการ — เพิ่มได้ทางด้านซ้าย
              </p>
            ) : (
              <ul className="mt-6 divide-y divide-[var(--color-sage-mist)]">
                {portfolioEntries.map((e) => (
                  <li key={e.id} className="flex items-baseline justify-between gap-3 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="mono-tag-ghost" style={{ borderColor: 'var(--color-fog)', color: 'var(--color-fog)' }}>
                          {KIND_LABEL[e.kind]}
                        </span>
                        <span style={{ fontFamily: 'var(--font-aspekta)', fontSize: 22 }}>{e.title}</span>
                      </div>
                      <div className="mt-1 text-[14px]" style={{ color: 'var(--color-fog)' }}>
                        {e.org} · {e.year}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        style={{
                          fontFamily: 'var(--font-roboto-mono)',
                          fontSize: 18,
                          color: 'var(--color-deep-sea)',
                        }}
                      >
                        W{e.weight}
                      </span>
                      <button
                        onClick={() => removePortfolioEntry(e.id)}
                        className="text-[13px] underline-offset-2 hover:underline cursor-pointer"
                        style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-fog)' }}
                      >
                        REMOVE
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-[40px] border border-[var(--color-sage-mist)] bg-[var(--color-light-gray)] p-10 text-[var(--color-carbon)]">
            <span className="mono-tag inline-flex">READINESS · ต่อมหาวิทยาลัย</span>
            <ul className="mt-6 space-y-5">
              {targets.map((id) => {
                const r = readinessFor({
                  universityId: id,
                  surveys,
                  completedNodeIds,
                  simulationResults,
                  portfolioEntries,
                });
                if (!r.university) return null;
                const passed = r.total >= r.threshold;
                return (
                  <li key={id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div style={{ fontFamily: 'var(--font-aspekta)', fontSize: 22 }}>{r.university.name}</div>
                        <div className="text-[14px]" style={{ color: 'var(--color-fog)' }}>
                          {r.university.program} · เกณฑ์ {r.threshold}
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-roboto-mono)',
                          fontSize: 28,
                          color: passed ? 'var(--color-deep-sea)' : 'var(--color-carbon)',
                        }}
                      >
                        {r.total.toFixed(0)}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                      {[
                        ['SKILL', r.skills],
                        ['PORTFOLIO', r.portfolio],
                        ['SIM', r.simulation],
                        ['ROADMAP', r.roadmap],
                      ].map(([label, val]) => (
                        <div
                          key={label as string}
                          className="rounded-[8px] border border-[var(--color-sage-mist)] py-2"
                        >
                          <div
                            style={{
                              fontFamily: 'var(--font-roboto-mono)',
                              fontSize: 18,
                              color: 'var(--color-carbon)',
                            }}
                          >
                            {(val as number).toFixed(0)}
                          </div>
                          <div className="text-[10px]" style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-fog)' }}>
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 h-[6px] overflow-hidden rounded-[8px] bg-[var(--color-sage-mist)]">
                      <div
                        className="h-full bg-[var(--color-bio-green)]"
                        style={{ width: `${Math.min(100, r.total)}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="mb-2 block text-[13px]"
        style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-sage-mist)' }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[12px]" style={{ color: '#ff8b8b', fontFamily: 'var(--font-roboto-mono)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
