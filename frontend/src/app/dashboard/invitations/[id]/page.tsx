"use client";

import Link from "next/link";
import { use, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { GuestList, type Guest } from "./_components/GuestList";
import styles from "./page.module.css";

// TODO: replace with GET /invitations/:id + GET /invitations/:id/guests
const MOCK_DATA: Record<
  string,
  {
    title: string;
    eventDate: string;
    eventLocation: string;
    totalGuests: number;
    confirmed: number;
    declined: number;
    pending: number;
    guests: Guest[];
  }
> = {
  "1": {
    title: "Ana & Lucas Wedding",
    eventDate: "2026-06-15T16:00",
    eventLocation: "Grand Ballroom, São Paulo",
    totalGuests: 120,
    confirmed: 74,
    declined: 12,
    pending: 34,
    guests: [
      { id: "g1", name: "John Smith", email: "john@example.com", rsvp: "confirmed" },
      { id: "g2", name: "Maria Souza", email: "maria@example.com", rsvp: "declined" },
      { id: "g3", name: "Carlos Lima", email: "carlos@example.com", rsvp: "pending" },
    ],
  },
  "2": {
    title: "João's 30th Birthday",
    eventDate: "2026-04-20T19:00",
    eventLocation: "Rooftop Bar, Rio de Janeiro",
    totalGuests: 45,
    confirmed: 28,
    declined: 5,
    pending: 12,
    guests: [
      { id: "g1", name: "Ana Lima", email: "ana@example.com", rsvp: "confirmed" },
    ],
  },
  "3": {
    title: "Tech Meetup Q2 2026",
    eventDate: "2026-05-08T18:30",
    eventLocation: "Innovation Hub, Brasília",
    totalGuests: 80,
    confirmed: 0,
    declined: 0,
    pending: 80,
    guests: [],
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function InvitationOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const initial = MOCK_DATA[id];

  const [guests, setGuests] = useState<Guest[]>(initial?.guests ?? []);

  if (!initial) {
    return (
      <Container>
        <p>Invitation not found.</p>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">← Back</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.pageHeader}>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">← Back</Link>
        </Button>
        <h1 className={styles.pageTitle}>{initial.title}</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/invitations/${id}/edit`}>Edit content</Link>
        </Button>
      </div>

      <div className={styles.sections}>
        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Event details</h2>
          <p className={styles.meta}>{formatDate(initial.eventDate)}</p>
          <p className={styles.meta}>{initial.eventLocation}</p>
        </Card>

        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>RSVP summary</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{initial.totalGuests}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.confirmed}`}>
                {initial.confirmed}
              </span>
              <span className={styles.statLabel}>Confirmed</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.declined}`}>
                {initial.declined}
              </span>
              <span className={styles.statLabel}>Declined</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{initial.pending}</span>
              <span className={styles.statLabel}>Pending</span>
            </div>
          </div>
        </Card>

        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Guests</h2>
          <GuestList guests={guests} onChange={setGuests} />
        </Card>
      </div>
    </Container>
  );
}
