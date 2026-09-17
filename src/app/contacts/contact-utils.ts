export type ContactStatus = "รายการใหม่" | "กำลังคุย" | "ปิดงาน";

export type Contact = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  channel: string;
  interest: string;
  status: ContactStatus;
  followUp: string;
  notes: string;
};

export const CONTACT_STATUSES: readonly ContactStatus[] = [
  "รายการใหม่",
  "กำลังคุย",
  "ปิดงาน",
];

export function isValidStatus(status: unknown): status is ContactStatus {
  return (
    typeof status === "string" &&
    (CONTACT_STATUSES as readonly string[]).includes(status)
  );
}

export function filterContacts(
  contacts: Contact[],
  query: string,
  statusFilter: ContactStatus | "ทั้งหมด",
): Contact[] {
  const q = query.trim().toLowerCase();
  return contacts.filter((contact) => {
    const matchesQuery =
      !q ||
      [contact.name, contact.company, contact.email, contact.phone].some(
        (value) => value.toLowerCase().includes(q),
      );
    return (
      matchesQuery &&
      (statusFilter === "ทั้งหมด" || contact.status === statusFilter)
    );
  });
}

export type ContactStats = {
  total: number;
  dueToday: number;
  overdue: number;
  won: number;
};

export function countContactStats(
  contacts: Contact[],
  today: string,
): ContactStats {
  return {
    total: contacts.length,
    dueToday: contacts.filter(
      (contact) =>
        contact.followUp === today && contact.status !== "ปิดงาน",
    ).length,
    overdue: contacts.filter(
      (contact) =>
        contact.followUp !== "" &&
        contact.followUp < today &&
        contact.status !== "ปิดงาน",
    ).length,
    won: contacts.filter((contact) => contact.status === "ปิดงาน").length,
  };
}

export type ContactInput = {
  name: unknown;
  company: unknown;
  email: unknown;
  phone: unknown;
  status: unknown;
};

export function validateContactInput(input: ContactInput): string | null {
  if (
    !input.name ||
    !input.company ||
    !input.email ||
    !input.phone ||
    !isValidStatus(input.status)
  ) {
    return "ข้อมูลผู้ติดต่อไม่ครบถ้วน";
  }
  return null;
}
