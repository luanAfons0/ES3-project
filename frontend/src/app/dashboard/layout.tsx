"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Container } from "@/components/Container/Container";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Button } from "@/components/Button/Button";
import styles from "./layout.module.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/auth/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/auth/login");
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Link href="/dashboard" className={styles.logo}>
            WellCard
          </Link>
          <div className={styles.headerActions}>
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </Container>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
