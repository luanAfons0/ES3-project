"use client";

import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./SmartImage.module.css";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export function SmartImage({ src, alt, className, fallbackClassName }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src) return null;

  if (failed) {
    return (
      <div
        className={[styles.fallback, fallbackClassName, className]
          .filter(Boolean)
          .join(" ")}
        role="img"
        aria-label={alt || "Imagem indisponível"}
      >
        <ImageOff size={28} aria-hidden />
        <span className={styles.fallbackText}>Imagem indisponível</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
