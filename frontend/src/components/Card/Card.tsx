import type { HTMLAttributes } from "react";
import styles from "./Card.module.css";

type CardProps = HTMLAttributes<HTMLDivElement>;

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={[styles.card, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Card };
