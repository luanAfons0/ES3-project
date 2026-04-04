"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { useGetInvitations } from "@/services/get-invitations";
import type { Invitation } from "@/lib/types";
import styles from "./page.module.css";

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
          <Link href={`/dashboard/invitations/${invitation.id}`}>View</Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCopyLink}>
          {copied ? "Copied!" : "Copy link"}
        </Button>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: invitations, isLoading, isError } = useGetInvitations();

  return (
    <Container>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Invitations</h1>
        <Button size="sm">New Invitation</Button>
      </div>

      {isLoading && <p>Loading…</p>}

      {isError && <p>Failed to load invitations. Please try again.</p>}

      {!isLoading && !isError && invitations?.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyText}>No invitations yet.</p>
          <Button>Create your first invitation</Button>
        </div>
      )}

      {!isLoading && !isError && invitations && invitations.length > 0 && (
        <div className={styles.grid}>
          {invitations.map((inv) => (
            <InvitationCard key={inv.id} invitation={inv} />
          ))}
        </div>
      )}
    </Container>
  );
}
