"use client";

import { useDraggable } from "@dnd-kit/core";
import {
  CalendarCheck,
  Image as ImageIcon,
  MousePointerClick,
  Type,
  type LucideIcon,
} from "lucide-react";
import type { BlockType } from "@/lib/types";
import styles from "./BlockPalette.module.css";

export const PALETTE_DRAG_PREFIX = "palette-";

interface PaletteEntry {
  type: BlockType;
  label: string;
  description: string;
  icon: LucideIcon;
}

const PALETTE: PaletteEntry[] = [
  { type: "text", label: "Texto", description: "Parágrafo", icon: Type },
  { type: "image", label: "Imagem", description: "Foto ou ilustração", icon: ImageIcon },
  { type: "button", label: "Botão", description: "Link de ação", icon: MousePointerClick },
  { type: "rsvp", label: "RSVP", description: "Confirmação", icon: CalendarCheck },
];

interface PaletteTileProps {
  entry: PaletteEntry;
  onAdd: (type: BlockType) => void;
  disabled?: boolean;
}

function PaletteTile({ entry, onAdd, disabled }: PaletteTileProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `${PALETTE_DRAG_PREFIX}${entry.type}`,
    data: { type: entry.type, source: "palette" },
    disabled,
  });

  const Icon = entry.icon;

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={[
        styles.tile,
        isDragging ? styles.tileDragging : null,
        disabled ? styles.tileDisabled : null,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => !disabled && onAdd(entry.type)}
      disabled={disabled}
      aria-label={`Adicionar bloco de ${entry.label.toLowerCase()}`}
      {...listeners}
      {...attributes}
    >
      <Icon size={20} className={styles.icon} aria-hidden />
      <span className={styles.label}>{entry.label}</span>
      <span className={styles.description}>{entry.description}</span>
    </button>
  );
}

interface BlockPaletteProps {
  onAdd: (type: BlockType) => void;
  disabled?: boolean;
}

export function BlockPalette({ onAdd, disabled }: BlockPaletteProps) {
  return (
    <div className={styles.palette}>
      <p className={styles.hint}>Arraste para o convite ou clique para adicionar.</p>
      <div className={styles.grid}>
        {PALETTE.map((entry) => (
          <PaletteTile
            key={entry.type}
            entry={entry}
            onAdd={onAdd}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
