import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import styles from "./app-sidebar.module.css";

export function AppSidebar({ active }: { active: "dashboard" | "contacts" }) {
  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.brand}>
          <span className={styles.logoMark}><i /><i /><i /></span>
          <span><strong>Follow-up Board</strong><small>CRM Follow-up Hub</small></span>
        </div>
        <p className={styles.navLabel}>เมนูหลัก</p>
        <nav className={styles.nav} aria-label="เมนูหลัก">
          <Link href="/dashboard" className={active === "dashboard" ? styles.activeNav : undefined} aria-current={active === "dashboard" ? "page" : undefined}><Icon name="dashboard" />แดชบอร์ด</Link>
          <Link href="/contacts" className={active === "contacts" ? styles.activeNav : undefined} aria-current={active === "contacts" ? "page" : undefined}><Icon name="users" />รายชื่อผู้ติดต่อ</Link>
          <span aria-disabled="true"><Icon name="calendar" />กำหนดการติดตาม</span>
          <span aria-disabled="true"><Icon name="chart" />รายงานและสถิติ</span>
          <span aria-disabled="true"><Icon name="settings" />ตั้งค่า</span>
        </nav>
      </div>
      <div className={styles.sidebarFooter}>
        <div className={styles.dueBadge}><Icon name="bell" size={17} /><span>ต้องติดตามวันนี้</span><strong>6 รายการ</strong></div>
        <div className={styles.profile}><span className={styles.profileAvatar}>ก</span><span><strong>กิตติศักดิ์ ชัยมงคล</strong><small>Sales Lead</small></span><Icon name="chevron" size={16} /></div>
      </div>
    </aside>
  );
}
