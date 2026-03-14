"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import styles from "./page.module.css";

interface Invitation {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  eventLocation: string;
  totalGuests: number;
  confirmed: number;
  declined: number;
  pending: number;
}

// TODO: replace with real API call via TanStack Query
const INITIAL_INVITATIONS: Invitation[] = [
  {
    id: "1",
    title: "Ana & Lucas Wedding",
    slug: "ana-and-lucas-wedding",
    eventDate: "2026-06-15T16:00",
    eventLocation: "Grand Ballroom, São Paulo",
    totalGuests: 120,
    confirmed: 74,
    declined: 12,
    pending: 34,
  },
  {
    id: "2",
    title: "João's 30th Birthday",
    slug: "joaos-30th-birthday",
    eventDate: "2026-04-20T19:00",
    eventLocation: "Rooftop Bar, Rio de Janeiro",
    totalGuests: 45,
    confirmed: 28,
    declined: 5,
    pending: 12,
  },
  {
    id: "3",
    title: "Tech Meetup Q2 2026",
    slug: "tech-meetup-q2-2026",
    eventDate: "2026-05-08T18:30",
    eventLocation: "Innovation Hub, Brasília",
    totalGuests: 80,
    confirmed: 0,
    declined: 0,
    pending: 80,
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function InvitationCard({ invitation }: { invitation: Invitation }) {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    const link = `${window.location.origin}/e/${invitation.slug}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Card className={styles.invitationCard}>
      <div className={styles.cardMeta}>
        <h2 className={styles.cardTitle}>{invitation.title}</h2>
        <p className={styles.cardDetail}>{formatDate(invitation.eventDate)}</p>
        <p className={styles.cardDetail}>{invitation.eventLocation}</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{invitation.totalGuests}</span>
          <span className={styles.statLabel}>Guests</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.confirmed}`}>
            {invitation.confirmed}
          </span>
          <span className={styles.statLabel}>Confirmed</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.declined}`}>
            {invitation.declined}
          </span>
          <span className={styles.statLabel}>Declined</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{invitation.pending}</span>
          <span className={styles.statLabel}>Pending</span>
        </div>
      </div>

      <div className={styles.cardActions}>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/invitations/${invitation.id}`}>Edit</Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCopyLink}>
          {copied ? "Copied!" : "Copy link"}
        </Button>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const [invitations] = useState<Invitation[]>(INITIAL_INVITATIONS);

  return (
    <Container>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Invitations</h1>
        <Button size="sm">New Invitation</Button>
      </div>

      {invitations.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>No invitations yet.</p>
          <Button>Create your first invitation</Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {invitations.map((inv) => (
            <InvitationCard key={inv.id} invitation={inv} />
          ))}
        </div>
      )}
    </Container>
  );
}
