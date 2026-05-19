"use client";

import { Calendar, Copy, ExternalLink, MapPin, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { useToast } from "@/components/Toast";
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
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    const link = `${window.location.origin}/e/${invitation.slug}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        toast("Link copiado para a área de transferência.", "success");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast("Não foi possível copiar o link.", "error");
      });
  }

  return (
    <Card className={styles.invitationCard}>
      <div className={styles.cardMeta}>
        <h2 className={styles.cardTitle}>{invitation.title}</h2>
        <p className={styles.cardDetail}>
          <Calendar size={13} aria-hidden className={styles.cardDetailIcon} />
          {formatDate(invitation.eventDate)}
        </p>
        <p className={styles.cardDetail}>
          <MapPin size={13} aria-hidden className={styles.cardDetailIcon} />
          {invitation.eventLocation}
        </p>
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
          <Link href={`/dashboard/invitations/${invitation.id}`}>
            <ExternalLink size={14} aria-hidden /> Ver
          </Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCopyLink}>
          <Copy size={14} aria-hidden />
          {copied ? "Copiado!" : "Copiar link"}
        </Button>
      </div>
    </Card>
  );
}

function InvitationCardSkeleton() {
  return (
    <Card className={styles.invitationCard}>
      <div className={styles.cardMeta}>
        <Skeleton height={20} width="75%" />
        <Skeleton height={13} width="55%" />
        <Skeleton height={13} width="65%" />
      </div>
      <div className={styles.stats}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div className={styles.stat} key={i}>
            <Skeleton height={20} width={28} />
            <Skeleton height={10} width={48} />
          </div>
        ))}
      </div>
      <div className={styles.cardActions}>
        <Skeleton height={28} width={64} radius={8} />
        <Skeleton height={28} width={92} radius={8} />
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: invitations, isLoading, isError, refetch } = useGetInvitations();

  return (
    <Container>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Meus convites</h1>
        <Button size="sm" asChild>
          <Link href="/dashboard/invitations/new">Novo convite</Link>
        </Button>
      </div>

      {isLoading && (
        <div className={styles.grid}>
          {Array.from({ length: 3 }).map((_, i) => (
            <InvitationCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className={styles.errorState} role="alert">
          <p>Falha ao carregar os convites.</p>
          <Button size="sm" variant="ghost" onClick={() => refetch()}>
            Tentar novamente
          </Button>
        </div>
      )}

      {!isLoading && !isError && invitations?.length === 0 && (
        <div className={styles.empty}>
          <PartyPopper size={40} aria-hidden className={styles.emptyIcon} />
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
