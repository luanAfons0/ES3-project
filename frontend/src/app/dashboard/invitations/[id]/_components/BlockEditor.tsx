"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import type { Block, BlockType } from "@/lib/types";
import styles from "./BlockEditor.module.css";

export type { BlockType, Block } from "@/lib/types";

interface SortableBlockProps {
  block: Block;
  onChange: (id: string, patch: Partial<Pick<Block, "content" | "link">>) => void;
  onRemove: (id: string) => void;
}

function SortableBlock({ block, onChange, onRemove }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

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

const BLOCK_TYPES: BlockType[] = ["text", "image", "button", "rsvp"];

const BLOCK_TYPE_LABEL: Record<BlockType, string> = {
  text: "texto",
  image: "imagem",
  button: "botão",
  rsvp: "rsvp",
};

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [addingType, setAddingType] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      onChange(arrayMove(blocks, oldIndex, newIndex));
    }
  }

  function handleBlockPatch(id: string, patch: Partial<Pick<Block, "content" | "link">>) {
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }

  function handleRemove(id: string) {
    onChange(blocks.filter((b) => b.id !== id));
  }

  function handleAdd(type: BlockType) {
    const newBlock: Block = { id: crypto.randomUUID(), type, content: "" };
    onChange([...blocks, newBlock]);
    setAddingType(false);
  }

  return (
    <div className={styles.editor}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.length === 0 && (
            <p className={styles.empty}>Nenhum bloco ainda. Adicione um abaixo.</p>
          )}
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              onChange={handleBlockPatch}
              onRemove={handleRemove}
            />
          ))}
        </SortableContext>
      </DndContext>

      {addingType ? (
        <div className={styles.typePicker}>
          <span className={styles.typePickerLabel}>Escolha o tipo:</span>
          {BLOCK_TYPES.map((type) => (
            <Button key={type} variant="ghost" size="sm" onClick={() => handleAdd(type)}>
              {BLOCK_TYPE_LABEL[type]}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={() => setAddingType(false)}>
            Cancelar
          </Button>
        </div>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => setAddingType(true)}>
          <Plus size={14} aria-hidden /> Adicionar bloco
        </Button>
      )}
    </div>
  );
}
