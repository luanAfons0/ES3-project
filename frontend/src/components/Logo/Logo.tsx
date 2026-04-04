import Link from "next/link";
import styles from "./Logo.module.css";

interface LogoProps {
  href?: string;
}

function EnvelopeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="4.5"
        width="19"
        height="13"
        rx="2.5"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M1.5 8L11 14L20.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 14C11 14 9 12.8 9 11.6C9 10.716 9.716 10 10.6 10.5C10.862 10.648 11.138 10.648 11.4 10.5C12.284 10 13 10.716 13 11.6C13 12.8 11 14 11 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({ href = "/" }: LogoProps) {
  return (
    <Link href={href} className={styles.logo}>
      <EnvelopeIcon />
      <span className={styles.wordmark}>WellCard</span>
    </Link>
  );
}
