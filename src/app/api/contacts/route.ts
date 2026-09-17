import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const statuses = new Set(["รายการใหม่", "กำลังคุย", "ปิดงาน"]);

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.name || !body.company || !body.email || !body.phone || !statuses.has(body.status)) {
    return NextResponse.json({ error: "ข้อมูลผู้ติดต่อไม่ครบถ้วน" }, { status: 400 });
  }

  const contact = await prisma.contact.create({
    data: {
      name: String(body.name),
      company: String(body.company),
      email: String(body.email),
      phone: String(body.phone),
      channel: String(body.channel ?? ""),
      interest: String(body.interest ?? ""),
      status: String(body.status),
      followUp: body.followUp ? new Date(`${body.followUp}T00:00:00.000Z`) : null,
      notes: String(body.notes ?? ""),
      userId: session.user.id,
    },
  });

  return NextResponse.json({
    ...contact,
    followUp: contact.followUp?.toISOString().slice(0, 10) ?? "",
  }, { status: 201 });
}
