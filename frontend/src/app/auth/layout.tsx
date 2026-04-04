import type { ReactNode } from "react";
import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./layout.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Logo />
          <ThemeToggle />
        </Container>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
