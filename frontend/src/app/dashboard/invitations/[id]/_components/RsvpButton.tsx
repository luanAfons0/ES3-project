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
        <span className={styles.icon} aria-hidden>✓</span>
        {label}
      </button>
    </div>
  );
}
