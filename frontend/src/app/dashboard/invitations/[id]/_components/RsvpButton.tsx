import { Check } from "lucide-react";
import styles from "./RsvpButton.module.css";

interface RsvpButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function RsvpButton({ label, disabled, onClick }: RsvpButtonProps) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} disabled={disabled} onClick={onClick}>
        <Check size={18} className={styles.icon} aria-hidden />
        {label}
      </button>
    </div>
  );
}
