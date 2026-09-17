import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Icon } from "@/components/ui/icon";
import { auth } from "@/lib/auth";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "แดชบอร์ด | Follow-up Board",
};

const metrics = [
  { label: "ทั้งหมด (Total Contacts)", value: "148", unit: "ราย", detail: "+12.4%", caption: "เทียบกับสัปดาห์ก่อน", icon: "users" as const, tone: "primary" },
  { label: "ต้องติดตามวันนี้", value: "6", unit: "รายการด่วน", detail: "สถานะสำคัญ", caption: "นัดหมายและโทรติดตาม", icon: "clock" as const, tone: "danger" },
  { label: "กำลังดำเนินการ", value: "42", unit: "ราย", detail: "28% ของทั้งหมด", caption: "ส่งใบเสนอราคาแล้ว", icon: "sync" as const, tone: "secondary" },
  { label: "สำเร็จแล้ว (Won)", value: "85", unit: "ราย", detail: "Win Rate 68%", caption: "+8 รายในรอบสัปดาห์", icon: "check" as const, tone: "success" },
];

const followUps = [
  { initial: "ว", name: "คุณวีรภาพ สิทธิสุข", company: "บจก. สยามเทรดดิ้ง", priority: "ด่วนมาก", contact: "081-234-5678", contactIcon: "phone" as const, time: "11:00 น.", status: "รอดำเนินการ", statusTone: "waiting", avatarTone: "purple", note: "โทรติดตามเรื่องใบเสนอราคา CRM ซอฟต์แวร์รอบสุดท้าย ลูกค้าสนใจแพ็กเกจ Enterprise 30 ที่นั่ง เพิ่มเงื่อนไขอบรมทีมงาน 2 วัน", owner: "กิตติศักดิ์ ช.", action: "โทรออก", actionIcon: "phone" as const },
  { initial: "พ", name: "คุณพิมพา พจนรัตน์", company: "TechNova Solutions", priority: "ปกติ", contact: "LINE: @technova", contactIcon: "activity" as const, time: "13:30 น.", status: "นัดประชุม Demo", statusTone: "meeting", avatarTone: "blue", note: "ส่งเอกสารเปรียบเทียบฟีเจอร์แล้ว เตรียมนัดทำ Live Demo ผ่าน Google Meet ร่วมกับทีมไอทีและฝ่ายปฏิบัติการ", owner: "กิตติศักดิ์ ช.", action: "เข้าร่วมประชุม", actionIcon: "video" as const },
  { initial: "ธ", name: "คุณธนกฤต มงคลกุล", company: "Apex Logistics Group", priority: "สำคัญ", contact: "thanakrit@apexlogistics.co.th", contactIcon: "mail" as const, time: "15:00 น.", status: "ติดต่อแล้วรอคำตอบ", statusTone: "neutral", avatarTone: "gray", note: "ตรวจสอบสถานะการอนุมัติสัญญารายปีจากผู้บริหาร ลูกค้าระบุว่าจะแจ้งคำตอบสรุปก่อนบ่ายสามโมงวันนี้", owner: "สมชาย ยินดี", action: "ส่งอีเมล", actionIcon: "mail" as const },
  { initial: "น", name: "คุณนันทนา วรวิวัฒน์", company: "บมจ. สยามโมเดิร์นรีเทล", priority: "ปกติ", contact: "089-987-6543", contactIcon: "phone" as const, time: "16:30 น.", status: "รอดำเนินการ", statusTone: "waiting", avatarTone: "green", note: "ทักทายหลังส่งใบเสนอราคาเบื้องต้น และสอบถามการประเมินงบประมาณระบบสำหรับ 3 สาขาใหม่", owner: "กิตติศักดิ์ ช.", action: "โทรออก", actionIcon: "phone" as const },
];

const pipeline = [
  { label: "ลูกค้าใหม่ / รอติดต่อ", value: 15, percent: "10%", tone: "primary" },
  { label: "กำลังเจรจา / นำเสนอ", value: 42, percent: "28%", tone: "secondary" },
  { label: "รอการตัดสินใจ", value: 21, percent: "14%", tone: "neutral" },
  { label: "สำเร็จ / ปิดการขาย (Won)", value: 85, percent: "57%", tone: "success" },
  { label: "ไม่สนใจ / ยกเลิก", value: 12, percent: "8%", tone: "danger" },
];

const activities = [
  { title: "บันทึกการโทร • คุณวีรภาพ", time: "15 นาทีที่แล้ว", detail: "ลูกค้าตอบรับดีมาก ขอส่วนลดเพิ่ม 5% สำหรับสัญญา 12 เดือน เตรียมปรับปรุงใบเสนอราคา", meta: "กิตติศักดิ์ ชัยมงคล", tone: "secondary" },
  { title: "เปลี่ยนสถานะเป็น “สำเร็จแล้ว”", time: "1 ชม. ที่แล้ว", detail: "คุณมณีรัตน์ (Thai Creative Co.) เซ็นสัญญาและโอนเงินมัดจำงวดแรกเรียบร้อย", meta: "ยอดขาย: ฿120,000", tone: "success" },
  { title: "เพิ่มผู้ติดต่อใหม่", time: "2 ชม. ที่แล้ว", detail: "คุณชานนท์ สุริยวงศ์ ผู้อำนวยการฝ่ายปฏิบัติการ (Apex Logistics) ถูกเพิ่มเข้าสู่ระบบ", meta: "นำเข้าจาก Web Form", tone: "primary" },
  { title: "ส่งเอกสารแคตตาล็อก", time: "3 ชม. ที่แล้ว", detail: "ส่ง PDF นำเสนอโซลูชันความปลอดภัยแก่ คุณชลธิชา (Bangkok Software Lab)", meta: "", tone: "neutral" },
];

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className={styles.shell}>
      <AppSidebar active="dashboard" />
      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <label className={styles.search}><Icon name="search" /><input type="search" placeholder="ค้นหาชื่อ, เบอร์โทร, อีเมล หรือบริษัท..." /><kbd>⌘K</kbd></label>
          <div className={styles.topActions}><button className={styles.primaryButton}><Icon name="plus" size={17} />เพิ่มผู้ติดต่อใหม่</button><button className={styles.iconButton} aria-label="การแจ้งเตือน"><Icon name="bell" /><i /></button><span className={styles.profileAvatar}>ก</span></div>
        </header>

        <main className={styles.main}>
          <section className={styles.pageHeader}>
            <div><p className={styles.eyebrow}><i />ระบบบริหารการติดตามลูกค้า • อัปเดตสด</p><h1>แดชบอร์ดภาพรวม <span>(Overview)</span></h1><p className={styles.subtitle}>ติดตามสถานะการติดต่อและการดำเนินงานประจำวัน อัปเดตล่าสุด วันนี้ 10:30 น.</p></div>
            <div className={styles.headerActions}><div className={styles.segmented}><button className={styles.selected}>สัปดาห์นี้</button><button>เดือนนี้</button><button>ไตรมาสนี้</button></div><button className={styles.secondaryButton}><Icon name="download" size={17} />ส่งออกรายงาน</button><button className={styles.primaryButton}><Icon name="plus" size={17} />เพิ่มผู้ติดต่อ</button></div>
          </section>

          <section className={styles.metricGrid} aria-label="ข้อมูลสรุป">
            {metrics.map((metric) => <article className={`${styles.metricCard} ${styles[metric.tone]}`} key={metric.label}><div className={styles.metricTop}><span>{metric.tone === "danger" && <i className={styles.liveDot} />}{metric.label}</span><b><Icon name={metric.icon} /></b></div><div><p className={styles.metricValue}>{metric.value} <small>{metric.unit}</small></p><p className={styles.metricDetail}><strong>{metric.detail}</strong><span>{metric.caption}</span></p></div></article>)}
          </section>

          <div className={styles.contentGrid}>
            <section className={styles.leftColumn}>
              <article className={styles.followUpCard}>
                <header className={styles.cardHeader}><div className={styles.cardTitle}><span className={styles.titleIcon}><Icon name="activity" /></span><span><h2>รายการที่ต้องติดตามวันนี้</h2><small>ทั้งหมด 6 รายการที่ถึงกำหนดการสนทนา</small></span></div><div className={styles.filters}><button className={styles.filterActive}>ทั้งหมด (6)</button><button>โทรศัพท์ (3)</button><button>นัดประชุม (2)</button></div></header>
                <div className={styles.followUpList}>
                  {followUps.map((item) => <article className={styles.followUpItem} key={item.name}><div className={styles.contactRow}><div className={styles.contact}><span className={`${styles.contactAvatar} ${styles[item.avatarTone]}`}>{item.initial}</span><div><div className={styles.contactName}><strong>{item.name}</strong><span>• {item.company}</span><em className={item.priority === "ปกติ" ? styles.normalPriority : styles.urgentPriority}>{item.priority}</em></div><div className={styles.contactMeta}><span><Icon name={item.contactIcon} size={15} />{item.contact}</span><i>•</i><span><Icon name="clock" size={15} />กำหนดเวลา {item.time}</span></div></div></div><span className={`${styles.status} ${styles[item.statusTone]}`}><i />{item.status}</span></div><p className={styles.note}><Icon name="note" size={17} /><span><strong>บันทึกล่าสุด:</strong> {item.note}</span></p><div className={styles.itemFooter}><span><Icon name="user" size={15} />ผู้รับผิดชอบ: {item.owner}</span><div><button className={styles.quickAction}><Icon name={item.actionIcon} size={15} />{item.action}</button><button className={styles.checkin}><Icon name="check" size={15} />เช็คอิน / บันทึกผล</button><button className={styles.moreButton} aria-label="ตัวเลือกเพิ่มเติม"><Icon name="more" /></button></div></div></article>)}
                </div>
                <button className={styles.viewAll}>ดูรายการติดตามทั้งหมดในระบบ (6 รายการ)<Icon name="chevron" size={15} /></button>
              </article>
              <aside className={styles.tip}><span className={styles.tipIcon}><Icon name="sparkles" /></span><div><strong>แนะนำการติดตาม: ติดต่อภายใน 2 ชั่วโมงแรก</strong><p>ลูกค้ารายใหม่มีโอกาสตอบรับเพิ่มขึ้นถึง 3.8 เท่า เมื่อมีการติดตามภายใน 2 ชั่วโมงหลังจากขอข้อมูล</p></div></aside>
            </section>

            <aside className={styles.rightColumn}>
              <article className={styles.sideCard}><header><h3><Icon name="pie" />สัดส่วนสถานะการติดต่อ</h3><small>148 รายชื่อ</small></header><div className={styles.pipelineBar}><i /><i /><i /><i /><i /></div><div className={styles.scale}><span>0%</span><span>100% Pipeline</span></div><div className={styles.pipelineList}>{pipeline.map((item) => <div key={item.label}><span><i className={styles[item.tone]} />{item.label}</span><strong>{item.value}</strong><small>{item.percent}</small></div>)}</div><button className={styles.funnelButton}>วิเคราะห์ Funnel เชิงลึก</button></article>
              <article className={styles.sideCard}><header><h3><Icon name="history" />กิจกรรมล่าสุด</h3><button>ดูทั้งหมด</button></header><div className={styles.timeline}>{activities.map((activity) => <div className={`${styles.activityItem} ${styles[activity.tone]}`} key={activity.title}><i /><div className={styles.activityHeading}><strong>{activity.title}</strong><time>{activity.time}</time></div><p>{activity.detail}</p>{activity.meta && <small><Icon name="user" size={14} />{activity.meta}</small>}</div>)}</div></article>
              <article className={styles.schedule}><header><strong>นัดหมายวันพรุ่งนี้</strong><span>3 คิวงาน</span></header><p><span>10:00 น. • บรรยายสาธิตระบบ (Zoom)</span><small>คุณกานดา</small></p><p><span>14:00 น. • ลงนามสัญญาบริการ</span><small>คุณชัยยุทธ</small></p></article>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
