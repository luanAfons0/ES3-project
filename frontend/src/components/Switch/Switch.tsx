"use client";

import * as RadixSwitch from "@radix-ui/react-switch";
import styles from "./Switch.module.css";

interface SwitchProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

function Switch({ id, checked, onCheckedChange, label, disabled }: SwitchProps) {
  return (
    <div className={styles.wrapper}>
      <RadixSwitch.Root
        id={id}
        className={styles.root}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <RadixSwitch.Thumb className={styles.thumb} />
      </RadixSwitch.Root>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}

export { Switch };
