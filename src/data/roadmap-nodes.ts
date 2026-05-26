import type { RoadmapNode } from '@/lib/types';

export const ROADMAP_NODES: RoadmapNode[] = [
  {
    id: 'foundation-math',
    title: 'ปรับพื้นฐานคณิตศาสตร์',
    description: 'ทบทวนพีชคณิตและฟังก์ชันก่อนลุยเนื้อหา ม.ปลาย',
    expReward: 50,
    prereqIds: [],
    keywords: ['คณิต', 'พื้นฐานคณิต', 'math', 'algebra', 'พีชคณิต'],
    axisFocus: 'logic',
  },
  {
    id: 'vocab-1000',
    title: 'ท่องคำศัพท์อังกฤษ 1,000 คำ',
    description: 'สร้างคลังศัพท์เพื่อรองรับ TGAT Eng และ A-Level',
    expReward: 80,
    prereqIds: [],
    keywords: ['คำศัพท์', 'ศัพท์', 'vocab', 'vocabulary', 'อังกฤษ', '1000 คำ'],
    axisFocus: 'language',
  },
  {
    id: 'study-routine',
    title: 'ตั้งตารางเรียนประจำสัปดาห์',
    description: 'วินัยเริ่มจากตารางที่ทำได้จริง 2 ชั่วโมงต่อวัน',
    expReward: 40,
    prereqIds: [],
    keywords: ['ตารางเรียน', 'วินัย', 'routine', 'schedule', 'แพลน'],
    axisFocus: 'discipline',
  },
  {
    id: 'tgat-mock-1',
    title: 'ทำข้อสอบ TGAT จำลองชุดที่ 1',
    description: 'จับเวลาจริง 3 ชั่วโมง พร้อมเฉลย',
    expReward: 120,
    prereqIds: ['foundation-math', 'vocab-1000'],
    keywords: ['tgat', 'ข้อสอบจำลอง', 'mock', 'tgat 1'],
    axisFocus: 'logic',
  },
  {
    id: 'bio-chapter-cell',
    title: 'ชีววิทยา: บทเซลล์',
    description: 'โครงสร้างเซลล์ ออร์แกเนลล์ และการลำเลียงสาร',
    expReward: 60,
    prereqIds: ['study-routine'],
    keywords: ['ชีวะ', 'biology', 'เซลล์', 'cell'],
    axisFocus: 'science',
  },
  {
    id: 'chem-stoichiometry',
    title: 'เคมี: ปริมาณสารสัมพันธ์',
    description: 'โมล สมการเคมี และการคำนวณสารสัมพันธ์',
    expReward: 70,
    prereqIds: ['foundation-math'],
    keywords: ['เคมี', 'stoichiometry', 'โมล', 'สารสัมพันธ์'],
    axisFocus: 'science',
  },
  {
    id: 'essay-thai',
    title: 'เขียนเรียงความภาษาไทย',
    description: 'ฝึกเขียนเชิงโต้แย้งและเชิงบรรยาย',
    expReward: 60,
    prereqIds: ['study-routine'],
    keywords: ['เรียงความ', 'เขียน', 'thai essay', 'ภาษาไทย'],
    axisFocus: 'language',
  },
  {
    id: 'volunteer-project',
    title: 'โครงการจิตอาสา 1 ครั้ง',
    description: 'ร่วมโครงการในชุมชนหรือโรงเรียน — สำหรับพอร์ต',
    expReward: 90,
    prereqIds: [],
    keywords: ['จิตอาสา', 'volunteer', 'อาสา', 'โครงการ'],
    axisFocus: 'empathy',
  },
  {
    id: 'creative-portfolio-piece',
    title: 'สร้างผลงานพอร์ตชิ้นแรก',
    description: 'งานออกแบบ/บทความ/วิจัยเล่มเล็ก',
    expReward: 100,
    prereqIds: ['essay-thai'],
    keywords: ['พอร์ต', 'portfolio', 'ผลงาน', 'creative'],
    axisFocus: 'creativity',
  },
  {
    id: 'tgat-mock-2',
    title: 'ข้อสอบ TGAT จำลองชุดที่ 2',
    description: 'ดูพัฒนาการจากชุดแรก',
    expReward: 130,
    prereqIds: ['tgat-mock-1'],
    keywords: ['tgat 2', 'mock 2', 'จำลอง 2'],
    axisFocus: 'logic',
  },
  {
    id: 'a-level-prep',
    title: 'เตรียม A-Level วิชาเอก',
    description: 'เลือกวิชาตามคณะเป้าหมายและทำโจทย์ย้อนหลัง',
    expReward: 150,
    prereqIds: ['bio-chapter-cell', 'chem-stoichiometry'],
    keywords: ['a-level', 'a level', 'วิชาเอก'],
    axisFocus: 'science',
  },
  {
    id: 'interview-mock',
    title: 'ซ้อมสัมภาษณ์รอบ Portfolio',
    description: 'อัดวิดีโอตอบคำถามจริงและรีวิวตัวเอง',
    expReward: 110,
    prereqIds: ['creative-portfolio-piece', 'volunteer-project'],
    keywords: ['สัมภาษณ์', 'interview', 'ซ้อมสัมภาษณ์', 'mock interview'],
    axisFocus: 'empathy',
  },
];

export function getNode(id: string) {
  return ROADMAP_NODES.find((n) => n.id === id);
}

export function isUnlocked(node: { prereqIds: string[] }, completed: string[]) {
  return node.prereqIds.every((p) => completed.includes(p));
}
