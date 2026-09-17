require("dotenv/config");

const { Pool } = require("pg");

const contacts = [
  {
    key: "veerapap",
    name: "คุณวีรภาพ สิทธิสุข",
    company: "บจก. สยามเทรดดิ้ง พาร์ทเนอร์",
    email: "veerapap@siamtrading.co.th",
    phone: "081-987-6543",
    channel: "โทรศัพท์",
    interest: "ระบบ CRM สำหรับทีมขาย",
    status: "กำลังคุย",
    followUp: "2026-09-17",
    notes: "ลูกค้าขอปรับสเปกในใบเสนอราคา ล็อต 500 ชุด ส่งแบบพิมพ์เขียวแล้ว",
  },
  {
    key: "pantipa",
    name: "คุณพรรณทิพา บุญประเสริฐ",
    company: "เคเอ็ม โลจิสติกส์",
    email: "panti@kmlogistics.co.th",
    phone: "089-456-7890",
    channel: "LINE: panti_km",
    interest: "แพ็กเกจ Enterprise 30 Users",
    status: "กำลังคุย",
    followUp: "2026-09-18",
    notes: "ขอนัดเดโมระบบสำหรับผู้ใช้งาน 30 คน พร้อมคู่มือภาษาไทย",
  },
  {
    key: "thanakorn",
    name: "คุณธนกร สุวรรณเวช",
    company: "สยาม เอ็นจิเนียริ่ง กรุ๊ป",
    email: "thanakorn@siameng.th",
    phone: "082-334-4556",
    channel: "อีเมล",
    interest: "Sales Pipeline Automation",
    status: "กำลังคุย",
    followUp: "2026-09-19",
    notes: "รอคอนเฟิร์มงบประมาณไตรมาส 4 ประชุมบอร์ดพรุ่งนี้เช้า",
  },
  {
    key: "sirinapa",
    name: "คุณศิรินภา เลิศวิลาส",
    company: "บริษัท นวัตกรรมไทย จำกัด",
    email: "sirinapa@thaitech.io",
    phone: "095-112-2334",
    channel: "เว็บไซต์",
    interest: "Cloud CRM",
    status: "รายการใหม่",
    followUp: "2026-09-20",
    notes: "กรอกแบบฟอร์มขอใบเสนอราคาจากหน้าเว็บไซต์ สนใจระบบ Cloud CRM",
  },
  {
    key: "anucha",
    name: "คุณอนุชา ปัญญารักษ์",
    company: "เบสท์ รีเทล คอร์ป",
    email: "anucha.p@bestretail.com",
    phone: "086-991-1223",
    channel: "อีเมล",
    interest: "ระบบติดตามลูกค้าองค์กร",
    status: "กำลังคุย",
    followUp: "2026-09-22",
    notes: "ส่งสัญญาจ้างบริการและ NDA แล้ว อยู่ในขั้นตอนฝ่ายกฎหมายตรวจสอบ",
  },
  {
    key: "kamolchat",
    name: "คุณกมลฉัตร วงศ์สุริยา",
    company: "ยูเนี่ยน โฮลดิ้งส์",
    email: "kamolchat@union.co.th",
    phone: "081-234-5678",
    channel: "LINE: kamolchat_u",
    interest: "Enterprise CRM",
    status: "ปิดงาน",
    followUp: "2026-09-25",
    notes: "ชำระเงินงวดแรกเรียบร้อยแล้ว นัดเทรนนิ่งทีมงานสัปดาห์หน้า",
  },
];

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const users = await pool.query('SELECT "id" FROM "User" ORDER BY "createdAt" LIMIT 2');

  if (users.rowCount !== 1) {
    await pool.end();
    throw new Error("Seeding requires exactly one user");
  }

  const userId = users.rows[0].id;

  try {
    await pool.query("BEGIN");

    for (const contact of contacts) {
      await pool.query(
        `INSERT INTO "Contact" (
          "id", "name", "company", "email", "phone", "channel", "interest",
          "status", "followUp", "notes", "createdAt", "updatedAt", "userId"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW(), $11)
        ON CONFLICT ("id") DO UPDATE SET
          "name" = EXCLUDED."name",
          "company" = EXCLUDED."company",
          "email" = EXCLUDED."email",
          "phone" = EXCLUDED."phone",
          "channel" = EXCLUDED."channel",
          "interest" = EXCLUDED."interest",
          "status" = EXCLUDED."status",
          "followUp" = EXCLUDED."followUp",
          "notes" = EXCLUDED."notes",
          "updatedAt" = NOW(),
          "userId" = EXCLUDED."userId"`,
        [
          `seed-contact-${contact.key}`,
          contact.name,
          contact.company,
          contact.email,
          contact.phone,
          contact.channel,
          contact.interest,
          contact.status,
          contact.followUp,
          contact.notes,
          userId,
        ],
      );
    }

    await pool.query("COMMIT");
    console.log(`Seeded ${contacts.length} contacts`);
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
