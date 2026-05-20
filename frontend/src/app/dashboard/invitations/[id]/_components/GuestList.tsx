"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import type { Guest, RsvpStatus } from "@/lib/types";
import styles from "./GuestList.module.css";

interface GuestListProps {
  guests: Guest[];
  onAdd: (name: string, email: string) => Promise<unknown>;
  onRemove: (id: string) => Promise<unknown>;
  isAdding?: boolean;
  addError?: string;
}

const STATUS_LABEL: Record<RsvpStatus, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  declined: "Recusado",
};

export function GuestList({
  guests,
  onAdd,
  onRemove,
  isAdding,
  addError,
}: GuestListProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await onAdd(name, email);
    setName("");
    setEmail("");
  }

  return (
    <div className={styles.guestList}>
      {guests.length === 0 ? (
        <p className={styles.empty}>Nenhum convidado ainda.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>E-mail</th>
              <th className={styles.th}>RSVP</th>
              <th className={styles.th} />
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} className={styles.row}>
                <td className={styles.td}>{guest.name}</td>
                <td className={styles.td}>{guest.email}</td>
                <td className={styles.td}>
                  <span className={`${styles.badge} ${styles[guest.rsvp]}`}>
                    {STATUS_LABEL[guest.rsvp]}
                  </span>
                </td>
                <td className={styles.td}>
                  <button
                    className={styles.removeButton}
                    onClick={() => onRemove(guest.id)}
                    aria-label={`Remover ${guest.name}`}
                    type="button"
                  >
                    <Trash2 size={16} aria-hidden />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <form onSubmit={handleAdd} className={styles.addForm}>
        <Input
          id="guest-name"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="guest-email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" size="sm" disabled={isAdding}>
          {isAdding ? "Adicionando…" : "Adicionar convidado"}
        </Button>
      </form>
      {addError && <p className={styles.formError}>{addError}</p>}
    </div>
  );
}
