import * as Label from "@radix-ui/react-label";
import type { InputHTMLAttributes} from "react";
import { forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <Label.Root className={styles.label} htmlFor={id}>
            {label}
          </Label.Root>
        )}
        <input
          ref={ref}
          id={id}
          className={[styles.input, error ? styles.error : "", className]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
