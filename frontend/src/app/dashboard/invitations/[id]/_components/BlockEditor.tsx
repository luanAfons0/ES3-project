"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import type { Block } from "@/lib/types";
import styles from "./BlockEditor.module.css";

export type { Block } from "@/lib/types";

export const CANVAS_DROPPABLE_ID = "canvas-drop";

const BLOCK_TYPE_LABEL = {
  text: "texto",
  image: "imagem",
  button: "botão",
  rsvp: "rsvp",
} as const;

interface SortableBlockProps {
  block: Block;
  onChange: (
    id: string,
    patch: Partial<Pick<Block, "content" | "link">>,
  ) => void;
  onRemove: (id: string) => void;
}

function SortableBlock({ block, onChange, onRemove }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.block}>
      <button
        className={styles.dragHandle}
        {...attributes}
        {...listeners}
        aria-label="Arrastar para reordenar"
        type="button"
      >
        <GripVertical size={18} aria-hidden />
      </button>
      <span className={styles.typeBadge}>{BLOCK_TYPE_LABEL[block.type]}</span>
      <div className={styles.blockContent}>
        {block.type === "text" ? (
          <textarea
            className={styles.textarea}
            value={block.content}
            onChange={(e) => onChange(block.id, { content: e.target.value })}
            placeholder="Digite o texto…"
            rows={3}
          />
        ) : block.type === "rsvp" ? (
          <input
            className={styles.input}
            type="text"
            value={block.content}
            onChange={(e) => onChange(block.id, { content: e.target.value })}
            placeholder="Confirmar presença"
          />
        ) : block.type === "button" ? (
          <div className={styles.buttonFields}>
            <input
              className={styles.input}
              type="text"
              value={block.content}
              onChange={(e) => onChange(block.id, { content: e.target.value })}
              placeholder="Texto do botão"
            />
            <input
              className={styles.input}
              type="url"
              value={block.link ?? ""}
              onChange={(e) => onChange(block.id, { link: e.target.value })}
              placeholder="https://… (link de destino)"
            />
          </div>
        ) : (
          <input
            className={styles.input}
            type="url"
            value={block.content}
            onChange={(e) => onChange(block.id, { content: e.target.value })}
            placeholder="URL da imagem…"
          />
        )}
      </div>
      <button
        className={styles.removeButton}
        onClick={() => onRemove(block.id)}
        aria-label="Remover bloco"
        type="button"
      >
        <Trash2 size={16} aria-hidden />
      </button>
    </div>
  );
}

interface BlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const { isOver, setNodeRef } = useDroppable({ id: CANVAS_DROPPABLE_ID });

  function handleBlockPatch(
    id: string,
    patch: Partial<Pick<Block, "content" | "link">>,
  ) {
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }

  function handleRemove(id: string) {
    onChange(blocks.filter((b) => b.id !== id));
  }

  return (
    <div
      ref={setNodeRef}
      className={[
        styles.editor,
        blocks.length === 0 ? styles.editorEmpty : null,
        isOver ? styles.editorOver : null,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SortableContext
        items={blocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        {blocks.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Comece pelo primeiro bloco</p>
            <p className={styles.emptyHint}>
              Arraste um elemento do painel à esquerda ou clique em um para
              adicionar.
            </p>
          </div>
        ) : (
          blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              onChange={handleBlockPatch}
              onRemove={handleRemove}
            />
          ))
        )}
      </SortableContext>
    </div>
  );
}
