"use client";

import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import styles from "./GuestList.module.css";

export type RsvpStatus = "pending" | "confirmed" | "declined";

export interface Guest {
  id: string;
  name: string;
  email: string;
  rsvp: RsvpStatus;
}

interface GuestListProps {
  guests: Guest[];
  onChange: (guests: Guest[]) => void;
}

const STATUS_LABEL: Record<RsvpStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  declined: "Declined",
};

export function GuestList({ guests, onChange }: GuestListProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (guests.some((g) => g.email.toLowerCase() === email.toLowerCase())) {
      setError("This email is already on the guest list.");
      return;
    }

    const newGuest: Guest = {
      id: crypto.randomUUID(),
      name,
      email,
      rsvp: "pending",
    };
    onChange([...guests, newGuest]);
    setName("");
    setEmail("");
  }

  function handleRemove(id: string) {
    onChange(guests.filter((g) => g.id !== id));
  }

  return (
    <div className={styles.guestList}>
      {guests.length === 0 ? (
        <p className={styles.empty}>No guests yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
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
                    onClick={() => handleRemove(guest.id)}
                    aria-label={`Remove ${guest.name}`}
                  >
                    ✕
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="guest-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" size="sm">
          Add guest
        </Button>
      </form>
      {error && <p className={styles.formError}>{error}</p>}
    </div>
  );
}
