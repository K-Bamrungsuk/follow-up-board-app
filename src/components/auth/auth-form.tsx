"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@/components/ui/icon";
import styles from "./auth-form.module.css";

type AuthMode = "sign-in" | "sign-up";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (isSignUp && password !== confirmPassword) {
      setError("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setIsPending(true);

    const result = isSignUp
      ? await authClient.signUp.email({
          name: String(formData.get("name")),
          email,
          password,
          callbackURL: "/dashboard",
        })
      : await authClient.signIn.email({
          email,
          password,
          rememberMe: formData.get("rememberMe") === "on",
          callbackURL: "/dashboard",
        });

    if (result.error) {
      setError(result.error.message ?? "ไม่สามารถดำเนินการได้ กรุณาลองอีกครั้ง");
      setIsPending(false);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.brand}>
          <span className={styles.logoMark}><i /><i /><i /></span>
          <span><strong>Follow-up Board</strong><small>CRM Follow-up Hub</small></span>
        </div>
        <div className={styles.introContent}>
          <p className={styles.eyebrow}>FOLLOW-UP, SIMPLIFIED</p>
          <h1>ทุกการติดตาม<br />ชัดเจนในที่เดียว</h1>
          <p>จัดการรายชื่อผู้ติดต่อ กำหนดวันติดตาม และดูความคืบหน้าของทีมได้อย่างเป็นระบบ</p>
          <div className={styles.featureList}>
            <span><Icon name="check" size={16} />ติดตามงานสำคัญได้ตรงเวลา</span>
            <span><Icon name="check" size={16} />เห็นภาพรวม Pipeline อย่างชัดเจน</span>
            <span><Icon name="check" size={16} />เก็บประวัติการติดต่อไว้ในจุดเดียว</span>
          </div>
        </div>
        <p className={styles.introFooter}>Nordic operational CRM for focused teams.</p>
      </section>

      <section className={styles.formSide}>
        <div className={styles.formCard}>
          <div className={styles.mobileBrand}>
            <span className={styles.logoMark}><i /><i /><i /></span>
            <strong>Follow-up Board</strong>
          </div>
          <header>
            <span className={styles.formIcon}><Icon name={isSignUp ? "users" : "user"} /></span>
            <p>{isSignUp ? "เริ่มต้นใช้งาน" : "ยินดีต้อนรับกลับมา"}</p>
            <h2>{isSignUp ? "สร้างบัญชีใหม่" : "เข้าสู่ระบบ"}</h2>
            <small>{isSignUp ? "กรอกข้อมูลเพื่อสร้างพื้นที่ทำงานของคุณ" : "เข้าสู่ระบบเพื่อจัดการรายการติดตามของคุณ"}</small>
          </header>

          <form onSubmit={handleSubmit}>
            {isSignUp && <label>ชื่อ-นามสกุล<input name="name" type="text" autoComplete="name" placeholder="ชื่อที่ใช้ในระบบ" required /></label>}
            <label>อีเมล<input name="email" type="email" autoComplete="email" placeholder="name@company.com" required /></label>
            <label>รหัสผ่าน<input name="password" type="password" autoComplete={isSignUp ? "new-password" : "current-password"} placeholder="อย่างน้อย 8 ตัวอักษร" minLength={8} maxLength={128} required /></label>
            {isSignUp && <label>ยืนยันรหัสผ่าน<input name="confirmPassword" type="password" autoComplete="new-password" placeholder="กรอกรหัสผ่านอีกครั้ง" minLength={8} maxLength={128} required /></label>}
            {!isSignUp && <label className={styles.remember}><input name="rememberMe" type="checkbox" defaultChecked /><span>จดจำการเข้าสู่ระบบ</span></label>}
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button className={styles.submitButton} type="submit" disabled={isPending}>{isPending ? "กำลังดำเนินการ..." : isSignUp ? "สร้างบัญชี" : "เข้าสู่ระบบ"}<Icon name="chevron" size={17} /></button>
          </form>

          <p className={styles.switchMode}>{isSignUp ? "มีบัญชีอยู่แล้ว?" : "ยังไม่มีบัญชี?"} <Link href={isSignUp ? "/sign-in" : "/sign-up"}>{isSignUp ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</Link></p>
        </div>
      </section>
    </main>
  );
}
