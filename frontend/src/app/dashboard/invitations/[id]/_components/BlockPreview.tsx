"use client";

import { SmartImage } from "@/components/SmartImage/SmartImage";
import type { Block } from "./BlockEditor";
import { RsvpButton } from "./RsvpButton";
import styles from "./BlockPreview.module.css";

interface BlockPreviewProps {
  blocks: Block[];
}

export function BlockPreview({ blocks }: BlockPreviewProps) {
  if (blocks.length === 0) {
    return <p className={styles.empty}>Nenhum bloco ainda. Vá para Editar para adicionar.</p>;
  }

  return (
    <div className={styles.preview}>
      {blocks.map((block) => {
        if (block.type === "text") {
          return (
            <p key={block.id} className={styles.textBlock}>
              {block.content || <span className={styles.placeholder}>Bloco de texto vazio</span>}
            </p>
          );
        }

        if (block.type === "image") {
          return block.content ? (
            <SmartImage
              key={block.id}
              src={block.content}
              alt=""
              className={styles.imageBlock}
            />
          ) : (
            <div key={block.id} className={styles.imagePlaceholder}>
              Nenhuma URL de imagem informada
            </div>
          );
        }

        if (block.type === "button") {
          const label = block.content || "Botão sem texto";
          return (
            <div key={block.id} className={styles.buttonWrapper}>
              {block.link ? (
                <a
                  className={styles.buttonBlock}
                  href={block.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ) : (
                <button className={styles.buttonBlock} disabled>
                  {block.content ? label : <span className={styles.placeholder}>{label}</span>}
                </button>
              )}
            </div>
          );
        }

        if (block.type === "rsvp") {
          return (
            <RsvpButton
              key={block.id}
              label={block.content || "Confirmar presença"}
              disabled
            />
          );
        }

        return null;
      })}
    </div>
  );
}
