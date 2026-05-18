"use client";

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
            // eslint-disable-next-line @next/next/no-img-element
            <img
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
          return (
            <div key={block.id} className={styles.buttonWrapper}>
              <button className={styles.buttonBlock} disabled>
                {block.content || <span className={styles.placeholder}>Botão sem texto</span>}
              </button>
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
