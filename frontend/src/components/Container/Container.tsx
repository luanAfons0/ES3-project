import type { HTMLAttributes } from "react";
import styles from "./Container.module.css";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={[styles.container, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Container };
