import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes} from "react";
import { forwardRef } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", asChild = false, className, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <Comp ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
