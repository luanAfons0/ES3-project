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
  return new Date(iso).toLocaleDateString("pt-BR", {
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
          <span className={styles.statLabel}>Convidados</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.confirmed}`}>
            {invitation.confirmed}
          </span>
          <span className={styles.statLabel}>Confirmados</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.declined}`}>
            {invitation.declined}
          </span>
          <span className={styles.statLabel}>Recusados</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{invitation.pending}</span>
          <span className={styles.statLabel}>Pendentes</span>
        </div>
      </div>

      <div className={styles.cardActions}>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/invitations/${invitation.id}`}>Ver</Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCopyLink}>
          {copied ? "Copiado!" : "Copiar link"}
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
        <h1 className={styles.pageTitle}>Meus convites</h1>
        <Button size="sm" asChild>
          <Link href="/dashboard/invitations/new">Novo convite</Link>
        </Button>
      </div>

      {isLoading && <p>Carregando…</p>}

      {isError && <p>Falha ao carregar os convites. Tente novamente.</p>}

      {!isLoading && !isError && invitations?.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Você ainda não tem convites.</p>
          <Button asChild>
            <Link href="/dashboard/invitations/new">
              Criar seu primeiro convite
            </Link>
          </Button>
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
