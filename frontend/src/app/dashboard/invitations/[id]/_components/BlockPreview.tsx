"use client";

import type { Block } from "./BlockEditor";
import { RsvpButton } from "./RsvpButton";
import styles from "./BlockPreview.module.css";

interface BlockPreviewProps {
  blocks: Block[];
}

export function BlockPreview({ blocks }: BlockPreviewProps) {
  if (blocks.length === 0) {
    return <p className={styles.empty}>No blocks yet. Switch to Edit to add some.</p>;
  }

  return (
    <div className={styles.preview}>
      {blocks.map((block) => {
        if (block.type === "text") {
          return (
            <p key={block.id} className={styles.textBlock}>
              {block.content || <span className={styles.placeholder}>Empty text block</span>}
            </p>
          );
        }

        if (block.type === "image") {
          return block.content ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={block.id}
              src={block.content}
              alt=""
              className={styles.imageBlock}
            />
          ) : (
            <div key={block.id} className={styles.imagePlaceholder}>
              No image URL provided
            </div>
          );
        }

        if (block.type === "button") {
          return (
            <div key={block.id} className={styles.buttonWrapper}>
              <button className={styles.buttonBlock} disabled>
                {block.content || <span className={styles.placeholder}>Unlabeled button</span>}
              </button>
            </div>
          );
        }

        if (block.type === "rsvp") {
          return (
            <RsvpButton
              key={block.id}
              label={block.content || "Confirm Attendance"}
              disabled
            />
          );
        }

        return null;
      })}
    </div>
  );
}
