import { describe, test, expect } from "vitest";
import {
  type Contact,
  countContactStats,
  filterContacts,
  isValidStatus,
  validateContactInput,
} from "./contact-utils";

function makeContact(overrides: Partial<Contact> = {}): Contact {
  return {
    id: "c1",
    name: "คุณวีรภาพ สิทธิสุข",
    company: "บจก. สยามเทรดดิ้ง พาร์ทเนอร์",
    email: "veerapap@siamtrading.co.th",
    phone: "081-987-6543",
    channel: "โทรศัพท์",
    interest: "ระบบ CRM",
    status: "กำลังคุย",
    followUp: "2026-09-17",
    notes: "",
    ...overrides,
  };
}

const contacts: Contact[] = [
  makeContact({ id: "c1", status: "กำลังคุย", followUp: "2026-09-17" }),
  makeContact({
    id: "c2",
    name: "คุณพรรณทิพา บุญประเสริฐ",
    company: "เคเอ็ม โลจิสติกส์",
    email: "panti@kmlogistics.co.th",
    phone: "089-456-7890",
    status: "รายการใหม่",
    followUp: "2026-09-20",
  }),
  makeContact({
    id: "c3",
    name: "คุณกมลฉัตร วงศ์สุริยา",
    company: "ยูเนี่ยน โฮลดิ้งส์",
    email: "kamolchat@union.co.th",
    phone: "081-234-5678",
    status: "ปิดงาน",
    followUp: "2026-09-17",
  }),
];

describe("filterContacts", () => {
  test("คำค้นว่างคืนทุกรายการ", () => {
    expect(filterContacts(contacts, "", "ทั้งหมด")).toHaveLength(3);
  });

  test("ค้นหาด้วยชื่อ", () => {
    const result = filterContacts(contacts, "พรรณทิพา", "ทั้งหมด");
    expect(result.map((c) => c.id)).toEqual(["c2"]);
  });

  test("ค้นหาด้วยบริษัท อีเมล และเบอร์โทร", () => {
    expect(
      filterContacts(contacts, "ยูเนี่ยน", "ทั้งหมด").map((c) => c.id),
    ).toEqual(["c3"]);
    expect(
      filterContacts(contacts, "panti@kmlogistics", "ทั้งหมด").map(
        (c) => c.id,
      ),
    ).toEqual(["c2"]);
    expect(
      filterContacts(contacts, "081-987", "ทั้งหมด").map((c) => c.id),
    ).toEqual(["c1"]);
  });

  test("ค้นหาไม่สนตัวพิมพ์เล็ก/ใหญ่และช่องว่าง", () => {
    expect(
      filterContacts(contacts, "  SIAMTRADING  ", "ทั้งหมด").map(
        (c) => c.id,
      ),
    ).toEqual(["c1"]);
  });

  test("กรองตามสถานะ", () => {
    expect(
      filterContacts(contacts, "", "รายการใหม่").map((c) => c.id),
    ).toEqual(["c2"]);
    expect(filterContacts(contacts, "", "ปิดงาน").map((c) => c.id)).toEqual([
      "c3",
    ]);
  });

  test("ค้นหาร่วมกับกรองสถานะ", () => {
    expect(filterContacts(contacts, "คุณ", "กำลังคุย").map((c) => c.id)).toEqual(
      ["c1"],
    );
    expect(filterContacts(contacts, "คุณ", "ปิดงาน").map((c) => c.id)).toEqual([
      "c3",
    ]);
  });
});

describe("countContactStats", () => {
  test("นับงานวันนี้ งานเกินกำหนด และงานที่ปิดแล้วถูกต้อง", () => {
    const stats = countContactStats(contacts, "2026-09-17");
    expect(stats.total).toBe(3);
    // c3 ถึงกำหนดวันนี้แต่ปิดงานแล้ว จึงไม่นับเป็นงานวันนี้
    expect(stats.dueToday).toBe(1);
    expect(stats.overdue).toBe(0);
    expect(stats.won).toBe(1);
  });

  test("งานที่เลยกำหนดและยังไม่ปิดนับเป็น overdue", () => {
    const stats = countContactStats(contacts, "2026-09-21");
    expect(stats.dueToday).toBe(0);
    // c1 และ c2 เลยกำหนดและยังไม่ปิดงาน
    expect(stats.overdue).toBe(2);
    expect(stats.won).toBe(1);
  });
});

describe("isValidStatus", () => {
  test("ยอมรับเฉพาะ 3 สถานะที่กำหนด", () => {
    expect(isValidStatus("รายการใหม่")).toBe(true);
    expect(isValidStatus("กำลังคุย")).toBe(true);
    expect(isValidStatus("ปิดงาน")).toBe(true);
    expect(isValidStatus("ทั้งหมด")).toBe(false);
    expect(isValidStatus("")).toBe(false);
    expect(isValidStatus(undefined)).toBe(false);
  });
});

describe("validateContactInput", () => {
  test("ข้อมูลครบและสถานะถูกต้องผ่าน", () => {
    expect(
      validateContactInput({
        name: "คุณทดสอบ",
        company: "บริษัททดสอบ",
        email: "test@example.com",
        phone: "081-000-0000",
        status: "รายการใหม่",
      }),
    ).toBeNull();
  });

  test("ข้อมูลไม่ครบหรือไม่ผ่าน", () => {
    expect(
      validateContactInput({
        name: "",
        company: "บริษัททดสอบ",
        email: "test@example.com",
        phone: "081-000-0000",
        status: "รายการใหม่",
      }),
    ).toBe("ข้อมูลผู้ติดต่อไม่ครบถ้วน");
    expect(
      validateContactInput({
        name: "คุณทดสอบ",
        company: "บริษัททดสอบ",
        email: "test@example.com",
        phone: "081-000-0000",
        status: "ไม่ทราบสถานะ",
      }),
    ).toBe("ข้อมูลผู้ติดต่อไม่ครบถ้วน");
  });
});
