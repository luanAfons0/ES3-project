import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/Container/Container";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./layout.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            WellCard
          </Link>
          <ThemeToggle />
        </Container>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
