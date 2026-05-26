import type { ScenarioModule } from '@/lib/types';

export const SCENARIOS: ScenarioModule[] = [
  {
    id: 'doctor-emergency',
    title: 'แพทย์ฉุกเฉิน',
    description: 'ทดลองตัดสินใจในห้องฉุกเฉินวันแรก — เลือกหนทางและดูผลกระทบกับโปรไฟล์',
    cards: [
      {
        id: 'd-1',
        prompt: 'ผู้ป่วยอุบัติเหตุเข้ามา 3 รายพร้อมกัน — คุณเลือกอะไร?',
        choices: [
          { id: 'd-1a', label: 'แยกผู้ป่วยตามอาการก่อนรักษา (Triage)', deltas: { logic: 4, discipline: 3 } },
          { id: 'd-1b', label: 'รักษาคนที่เห็นเลือดมากที่สุดก่อน', deltas: { empathy: 3, logic: -2 } },
          { id: 'd-1c', label: 'ปรึกษาพี่แพทย์ทันที', deltas: { empathy: 2, discipline: 2 } },
        ],
      },
      {
        id: 'd-2',
        prompt: 'ญาติคนไข้กังวลและตั้งคำถามเยอะ',
        choices: [
          { id: 'd-2a', label: 'อธิบายขั้นตอนอย่างใจเย็น', deltas: { empathy: 5, language: 3 } },
          { id: 'd-2b', label: 'บอกว่ายังไม่ว่าง ขอเวลาก่อน', deltas: { empathy: -3, discipline: 1 } },
        ],
      },
      {
        id: 'd-3',
        prompt: 'ผู้ป่วยจำเป็นต้องผ่าตัดด่วนแต่ไม่มีญาติ',
        choices: [
          { id: 'd-3a', label: 'ทำตามแนวปฏิบัติฉุกเฉินและบันทึก', deltas: { discipline: 5, logic: 3 } },
          { id: 'd-3b', label: 'รอจนติดต่อญาติได้', deltas: { discipline: -2, empathy: 1 } },
        ],
      },
      {
        id: 'd-4',
        prompt: 'จบเวรที่ 1 — สรุปบทเรียน',
        choices: [
          { id: 'd-4a', label: 'จดบันทึกเคส 3 อันที่ยากที่สุด', deltas: { discipline: 4, science: 3 } },
          { id: 'd-4b', label: 'พักก่อน ค่อยทบทวนพรุ่งนี้', deltas: { empathy: 2 } },
        ],
      },
    ],
  },
  {
    id: 'sw-engineer-launch',
    title: 'วิศวกรซอฟต์แวร์: ปล่อยฟีเจอร์',
    description: 'ทีมต้องปล่อยฟีเจอร์สำคัญพรุ่งนี้ คุณเลือกแนวทางไหน?',
    cards: [
      {
        id: 's-1',
        prompt: 'พบบั๊กก่อนเดดไลน์ 2 ชั่วโมง',
        choices: [
          { id: 's-1a', label: 'แก้ทันที + เขียนเทสต์', deltas: { logic: 5, discipline: 3 } },
          { id: 's-1b', label: 'เลื่อนปล่อยและสื่อสารทีม', deltas: { empathy: 4, discipline: 2 } },
          { id: 's-1c', label: 'แปะเทปทับและส่ง', deltas: { logic: -3, discipline: -3 } },
        ],
      },
      {
        id: 's-2',
        prompt: 'ดีไซเนอร์อยากปรับ UI เพิ่มท้ายชั่วโมง',
        choices: [
          { id: 's-2a', label: 'ฟัง + เสนอทางที่ทำได้ในเวลาที่เหลือ', deltas: { empathy: 3, creativity: 3 } },
          { id: 's-2b', label: 'ปฏิเสธทันที', deltas: { empathy: -3 } },
        ],
      },
      {
        id: 's-3',
        prompt: 'หลังปล่อย — มีรายงานบั๊กจากผู้ใช้',
        choices: [
          { id: 's-3a', label: 'ตอบกลับทันทีและเปิด ticket', deltas: { language: 3, discipline: 4 } },
          { id: 's-3b', label: 'รอทีมซัพพอร์ตจัดการ', deltas: { discipline: -2 } },
        ],
      },
      {
        id: 's-4',
        prompt: 'รีวิวสปรินต์',
        choices: [
          { id: 's-4a', label: 'แชร์สิ่งที่เรียนรู้ + propose RFC', deltas: { creativity: 4, language: 3 } },
          { id: 's-4b', label: 'รอให้คนอื่นพูดก่อน', deltas: { empathy: 1 } },
        ],
      },
    ],
  },
  {
    id: 'lawyer-case',
    title: 'นักกฎหมาย: คดีแรก',
    description: 'รับคดีแรกเป็นทนายฝึกหัด — สมดุลระหว่างกฎหมายและคน',
    cards: [
      {
        id: 'l-1',
        prompt: 'ลูกความเล่าเรื่องไม่ครบ',
        choices: [
          { id: 'l-1a', label: 'ตั้งคำถามเชิงลึกอย่างใจเย็น', deltas: { language: 4, empathy: 4 } },
          { id: 'l-1b', label: 'สรุปเร็วๆ เพื่อประหยัดเวลา', deltas: { logic: 1, empathy: -3 } },
        ],
      },
      {
        id: 'l-2',
        prompt: 'พบช่องโหว่ทางเทคนิคในคดี',
        choices: [
          { id: 'l-2a', label: 'ใช้ตามหลักกฎหมายอย่างเคร่งครัด', deltas: { logic: 5, discipline: 3 } },
          { id: 'l-2b', label: 'ใช้แล้วเล่าให้ลูกความฟังทุกความเสี่ยง', deltas: { logic: 3, empathy: 4, language: 3 } },
        ],
      },
      {
        id: 'l-3',
        prompt: 'พิจารณาคดีในศาล',
        choices: [
          { id: 'l-3a', label: 'เตรียมโน้ตและฝึกพูดล่วงหน้า', deltas: { discipline: 5, language: 3 } },
          { id: 'l-3b', label: 'ด้นสด ใช้ปฏิภาณ', deltas: { creativity: 3, discipline: -2 } },
        ],
      },
    ],
  },
];

export function getModule(id: string) {
  return SCENARIOS.find((s) => s.id === id);
}
