"use client";

import { type ReactNode } from "react";
import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Button } from "@/components/Button/Button";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "./layout.module.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Logo href="/dashboard" />
          <div className={styles.headerActions}>
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              Sair
            </Button>
          </div>
        </Container>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
