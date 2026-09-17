"use client";

import { type FormEvent, useDeferredValue, useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Icon } from "@/components/ui/icon";
import styles from "./contacts.module.css";
import {
  type Contact,
  type ContactStatus,
  countContactStats,
  filterContacts,
} from "./contact-utils";

const emptyContact: Omit<Contact, "id"> = {
  name: "", company: "", email: "", phone: "", channel: "", interest: "", status: "รายการใหม่", followUp: "", notes: "",
};

export function ContactsClient({ initialContacts }: { initialContacts: Contact[] }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "ทั้งหมด">("ทั้งหมด");
  const [editing, setEditing] = useState<Contact | null>(null);
  const [draft, setDraft] = useState<Omit<Contact, "id">>(emptyContact);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const today = new Date().toISOString().slice(0, 10);
  const { dueToday, overdue, won } = countContactStats(contacts, today);

  const visibleContacts = filterContacts(contacts, deferredQuery, statusFilter);

  function openCreate() {
    setEditing(null);
    setDraft(emptyContact);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEdit(contact: Contact) {
    setEditing(contact);
    setDraft(contact);
    setFormError("");
    setIsModalOpen(true);
  }

  async function saveContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFormError("");

    const response = await fetch(editing ? `/api/contacts/${editing.id}` : "/api/contacts", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    if (!response.ok) {
      const result = await response.json();
      setFormError(result.error ?? "ไม่สามารถบันทึกข้อมูลได้");
      setIsSaving(false);
      return;
    }

    const savedContact: Contact = await response.json();
    setContacts((current) => editing
      ? current.map((contact) => contact.id === editing.id ? savedContact : contact)
      : [savedContact, ...current]);
    setIsSaving(false);
    setIsModalOpen(false);
  }

  async function deleteContact(contact: Contact) {
    if (window.confirm(`ลบรายชื่อ ${contact.name} ใช่หรือไม่?`)) {
      const response = await fetch(`/api/contacts/${contact.id}`, { method: "DELETE" });

      if (!response.ok) {
        setFormError("ไม่สามารถลบข้อมูลผู้ติดต่อได้");
        return;
      }

      setContacts((current) => current.filter((item) => item.id !== contact.id));
      if (editing?.id === contact.id) setIsModalOpen(false);
    }
  }

  return (
    <div className={styles.shell}>
      <AppSidebar active="contacts" />
      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <label className={styles.globalSearch}><Icon name="search" /><input type="search" placeholder="ค้นหาชื่อ, เบอร์โทร, อีเมล หรือบริษัท..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘K</kbd></label>
          <div className={styles.topActions}><button className={styles.primaryButton} onClick={openCreate}><Icon name="plus" size={17} />เพิ่มผู้ติดต่อใหม่</button><button className={styles.iconButton} aria-label="การแจ้งเตือน"><Icon name="bell" /><i /></button><span className={styles.profileAvatar}>ก</span></div>
        </header>

        <main className={styles.main}>
          <section className={styles.stats} aria-label="ข้อมูลสรุปรายชื่อผู้ติดต่อ">
            <article><span><small>ผู้ติดต่อทั้งหมด</small><strong>{contacts.length}</strong><em>เฉพาะรายชื่อของคุณ</em></span><b><Icon name="users" /></b></article>
            <article><span><small>ต้องติดตามวันนี้</small><strong>{dueToday}</strong><em className={styles.red}>รายการที่ถึงกำหนด</em></span><b className={styles.redIcon}><Icon name="clock" /></b></article>
            <article><span><small>เกินกำหนด (Overdue)</small><strong>{overdue}</strong><em>รอดำเนินการ</em></span><b><Icon name="history" /></b></article>
            <article><span><small>ปิดการขายสำเร็จ</small><strong>{won}</strong><em>จากรายชื่อทั้งหมด</em></span><b className={styles.greenIcon}><Icon name="check" /></b></article>
          </section>

          <section className={styles.directoryHeader}>
            <div><p className={styles.eyebrow}>CONTACT MANAGEMENT</p><h1>รายชื่อผู้ติดต่อทั้งหมด <span>(Contacts Directory)</span></h1><p>จัดการ ค้นหา กรองสถานะ และติดตามความคืบหน้ารายชื่อผู้ติดต่อทั้งหมดในระบบ</p></div>
            <div><button className={styles.secondaryButton}><Icon name="upload" size={16} />นำเข้า Excel/CSV</button><button className={styles.secondaryButton}><Icon name="download" size={16} />ส่งออกข้อมูล</button><button className={styles.primaryButton} onClick={openCreate}><Icon name="plus" size={17} />เพิ่มผู้ติดต่อใหม่</button></div>
          </section>

          <section className={styles.filterBar}>
            <label className={styles.directorySearch}><Icon name="search" size={18} /><input type="search" placeholder="ค้นหาชื่อ บริษัท เบอร์โทร หรืออีเมล..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
            <label><span>สถานะ</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as ContactStatus | "ทั้งหมด")}><option>ทั้งหมด</option><option>รายการใหม่</option><option>กำลังคุย</option><option>ปิดงาน</option></select></label>
            <button className={styles.clearButton} onClick={() => { setQuery(""); setStatusFilter("ทั้งหมด"); }}><Icon name="filter" size={16} />ล้างตัวกรอง</button>
          </section>

          <section className={styles.tableCard}>
            <div className={styles.tableMeta}><span><Icon name="users" size={17} />แสดง {visibleContacts.length} จาก {contacts.length} รายการ</span><span>ข้อมูลของคุณ</span></div>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>รายชื่อผู้ติดต่อ & องค์กร</th><th>ช่องทางติดต่อ</th><th>สถานะ</th><th>กำหนดการติดตาม</th><th>หมายเหตุล่าสุด</th><th>จัดการ</th></tr></thead>
                <tbody>{visibleContacts.map((contact) => <tr key={contact.id}><td data-label="ผู้ติดต่อ"><div className={styles.contactCell}><span>{contact.name.replace("คุณ", "").split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><div><strong>{contact.name}</strong><small>{contact.company}</small><em>{contact.interest}</em></div></div></td><td data-label="ช่องทางติดต่อ"><p><Icon name="phone" size={14} />{contact.phone}</p><p><Icon name="mail" size={14} />{contact.email}</p><small>{contact.channel}</small></td><td data-label="สถานะ"><span className={`${styles.status} ${styles[contact.status === "รายการใหม่" ? "new" : contact.status === "ปิดงาน" ? "won" : "progress"]}`}>{contact.status}</span></td><td data-label="ติดตาม"><strong className={styles.date}><Icon name="calendar" size={15} />{contact.followUp || "ยังไม่กำหนด"}</strong></td><td data-label="หมายเหตุ"><p className={styles.notes}>{contact.notes || "ไม่มีหมายเหตุ"}</p></td><td data-label="จัดการ"><div className={styles.rowActions}><a href={`tel:${contact.phone}`} aria-label={`โทรหา ${contact.name}`}><Icon name="phone" size={16} /></a><button onClick={() => openEdit(contact)} aria-label={`แก้ไข ${contact.name}`}><Icon name="edit" size={16} /></button><button className={styles.deleteButton} onClick={() => deleteContact(contact)} aria-label={`ลบ ${contact.name}`}><Icon name="trash" size={16} /></button></div></td></tr>)}</tbody>
              </table>
              {visibleContacts.length === 0 && <div className={styles.emptyState}><Icon name="search" /><strong>ไม่พบรายชื่อผู้ติดต่อ</strong><p>ลองเปลี่ยนคำค้นหาหรือตัวกรองสถานะ</p></div>}
            </div>
            <footer className={styles.pagination}><span>แสดง 1 ถึง {visibleContacts.length} จากทั้งหมด {contacts.length} รายการ</span><div><button disabled>ก่อนหน้า</button><b>1</b><button disabled>ถัดไป</button></div></footer>
          </section>
        </main>
      </div>

      {isModalOpen && <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false); }}><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="contact-form-title"><header><div><p>{editing ? `ID: CT-${editing.id.slice(-6).toUpperCase()}` : "NEW CONTACT"}</p><h2 id="contact-form-title">{editing ? "แก้ไขข้อมูลผู้ติดต่อ" : "เพิ่มผู้ติดต่อใหม่"}</h2><span>อัปเดตข้อมูลลูกค้า ช่องทางติดต่อ และกำหนดการติดตามผล</span></div><button onClick={() => setIsModalOpen(false)} aria-label="ปิด"><Icon name="x" /></button></header><form onSubmit={saveContact}><fieldset><legend>1. ข้อมูลผู้ติดต่อ</legend><div className={styles.formGrid}><label>ชื่อ-นามสกุล *<input required value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label><label>บริษัท / องค์กร *<input required value={draft.company} onChange={(event) => setDraft({ ...draft, company: event.target.value })} /></label><label>อีเมล *<input type="email" required value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /></label><label>เบอร์โทรศัพท์ *<input required value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} /></label></div></fieldset><fieldset><legend>2. ช่องทางและความสนใจ</legend><div className={styles.formGrid}><label>ช่องทางติดต่อ<input value={draft.channel} onChange={(event) => setDraft({ ...draft, channel: event.target.value })} placeholder="เช่น LINE, Email, โทรศัพท์" /></label><label>สิ่งที่สนใจ<input value={draft.interest} onChange={(event) => setDraft({ ...draft, interest: event.target.value })} /></label></div></fieldset><fieldset><legend>3. การติดตามและสถานะ</legend><div className={styles.formGrid}><label>สถานะ *<select required value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as ContactStatus })}><option>รายการใหม่</option><option>กำลังคุย</option><option>ปิดงาน</option></select></label><label>วันที่ต้อง Follow-up<input type="date" value={draft.followUp} onChange={(event) => setDraft({ ...draft, followUp: event.target.value })} /></label></div></fieldset><fieldset><legend>4. บันทึกและหมายเหตุ</legend><label>หมายเหตุ<textarea rows={4} value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} /></label></fieldset>{formError && <p className={styles.formError} role="alert">{formError}</p>}<footer>{editing && <button type="button" className={styles.modalDelete} onClick={() => deleteContact(editing)}><Icon name="trash" size={16} />ลบรายชื่อนี้</button>}<span /><button type="button" className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>ยกเลิก</button><button type="submit" className={styles.primaryButton} disabled={isSaving}><Icon name="check" size={16} />{isSaving ? "กำลังบันทึก..." : editing ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มผู้ติดต่อ"}</button></footer></form></section></div>}
    </div>
  );
}
