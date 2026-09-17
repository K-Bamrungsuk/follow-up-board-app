import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ContactsClient } from "./contacts-client";

export const metadata: Metadata = {
  title: "รายชื่อผู้ติดต่อ | Follow-up Board",
};

export default async function ContactsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const contacts = await prisma.contact.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  const allowedStatuses = new Set(["รายการใหม่", "กำลังคุย", "ปิดงาน"]);

  return (
    <ContactsClient
      initialContacts={contacts.map((contact) => ({
        ...contact,
        status: (allowedStatuses.has(contact.status) ? contact.status : "รายการใหม่") as "รายการใหม่" | "กำลังคุย" | "ปิดงาน",
        followUp: contact.followUp?.toISOString().slice(0, 10) ?? "",
        createdAt: contact.createdAt.toISOString(),
        updatedAt: contact.updatedAt.toISOString(),
      }))}
    />
  );
}
