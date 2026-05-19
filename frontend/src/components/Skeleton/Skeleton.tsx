import styles from "./Skeleton.module.css";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
}

export function Skeleton({ width, height, radius, className }: SkeletonProps) {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius: radius,
  };
  return (
    <span
      className={[styles.skeleton, className].filter(Boolean).join(" ")}
      style={style}
      aria-hidden
    />
  );
}
