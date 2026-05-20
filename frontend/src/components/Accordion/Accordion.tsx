"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./Accordion.module.css";

interface AccordionItemProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function AccordionItem({ title, defaultOpen = true, children }: AccordionItemProps) {
  return (
    <details className={styles.item} open={defaultOpen}>
      <summary className={styles.summary}>
        <span className={styles.title}>{title}</span>
        <ChevronDown size={16} className={styles.chevron} aria-hidden />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
