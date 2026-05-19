"use client";

import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useToastStore, type Toast } from "./toast-store";
import styles from "./Toaster.module.css";

const TOAST_DURATION_MS = 3500;

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

function ToastItem({ toast }: { toast: Toast }) {
  const dismiss = useToastStore((s) => s.dismiss);

  useEffect(() => {
    const id = setTimeout(() => dismiss(toast.id), TOAST_DURATION_MS);
    return () => clearTimeout(id);
  }, [toast.id, dismiss]);

  const Icon = ICONS[toast.kind];

  return (
    <div
      className={[styles.toast, styles[toast.kind]].join(" ")}
      role="status"
      aria-live="polite"
    >
      <Icon size={18} aria-hidden className={styles.icon} />
      <span className={styles.message}>{toast.message}</span>
      <button
        type="button"
        className={styles.dismiss}
        onClick={() => dismiss(toast.id)}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.region} aria-label="Notificações">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>,
    document.body
  );
}
