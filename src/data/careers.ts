import type { Career } from '@/lib/types';

export const CAREERS: Career[] = [
  {
    id: 'software-engineer',
    title: 'วิศวกรซอฟต์แวร์',
    description: 'ออกแบบ พัฒนา และดูแลระบบซอฟต์แวร์ — เน้นตรรกะและการแก้ปัญหา',
    target: { logic: 90, language: 60, science: 75, empathy: 50, creativity: 70, discipline: 80 },
  },
  {
    id: 'doctor',
    title: 'แพทย์',
    description: 'ดูแลรักษาผู้ป่วย ใช้ความรู้ชีววิทยา-เคมี และมนุษยสัมพันธ์',
    target: { logic: 75, language: 65, science: 95, empathy: 90, creativity: 50, discipline: 90 },
  },
  {
    id: 'designer',
    title: 'นักออกแบบ',
    description: 'สร้างประสบการณ์และภาพลักษณ์ — เน้นความคิดสร้างสรรค์',
    target: { logic: 60, language: 70, science: 40, empathy: 75, creativity: 95, discipline: 65 },
  },
  {
    id: 'lawyer',
    title: 'นักกฎหมาย',
    description: 'ตีความและบังคับใช้กฎหมาย ใช้ภาษาและการให้เหตุผลเป็นหลัก',
    target: { logic: 85, language: 90, science: 40, empathy: 75, creativity: 60, discipline: 85 },
  },
  {
    id: 'data-scientist',
    title: 'นักวิทยาศาสตร์ข้อมูล',
    description: 'วิเคราะห์ข้อมูลขนาดใหญ่ สร้างโมเดลทำนาย — สถิติ + การเขียนโปรแกรม',
    target: { logic: 90, language: 65, science: 85, empathy: 50, creativity: 70, discipline: 80 },
  },
  {
    id: 'teacher',
    title: 'ครู',
    description: 'ถ่ายทอดความรู้และพัฒนาผู้เรียน — มนุษยสัมพันธ์และวินัย',
    target: { logic: 65, language: 85, science: 60, empathy: 95, creativity: 75, discipline: 90 },
  },
];

export function getCareer(id?: string): Career | undefined {
  return CAREERS.find((c) => c.id === id);
}
