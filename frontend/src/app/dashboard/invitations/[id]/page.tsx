"use client";

import Link from "next/link";
import { use } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { useGetInvitation } from "@/services/get-invitation";
import { useGetGuests } from "@/services/get-guests";
import { useAddGuest } from "@/services/add-guest";
import { useRemoveGuest } from "@/services/remove-guest";
import { GuestList } from "./_components/GuestList";
import styles from "./page.module.css";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
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

  const { data: invitation, isLoading, isError } = useGetInvitation(id);
  const { data: guests = [] } = useGetGuests(id);
  const addGuest = useAddGuest(id);
  const removeGuest = useRemoveGuest(id);

  if (isLoading) {
    return <Container><p>Carregando…</p></Container>;
  }

  if (isError || !invitation) {
    return (
      <Container>
        <p>Convite não encontrado.</p>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">← Voltar</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.pageHeader}>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">← Voltar</Link>
        </Button>
        <h1 className={styles.pageTitle}>{invitation.title}</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/invitations/${id}/edit`}>Editar conteúdo</Link>
        </Button>
      </div>

      <div className={styles.sections}>
        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Detalhes do evento</h2>
          <p className={styles.meta}>{formatDate(invitation.eventDate)}</p>
          <p className={styles.meta}>{invitation.eventLocation}</p>
        </Card>

        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Resumo de RSVP</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{invitation.totalGuests}</span>
              <span className={styles.statLabel}>Total</span>
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
        </Card>

        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Convidados</h2>
          <GuestList
            guests={guests}
            onAdd={(name, email) => addGuest.mutateAsync({ name, email })}
            onRemove={(guestId) => removeGuest.mutateAsync(guestId)}
            isAdding={addGuest.isPending}
            addError={addGuest.error?.message}
          />
        </Card>
      </div>
    </Container>
  );
}
