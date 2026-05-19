"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { Dialog } from "@/components/Dialog/Dialog";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { SmartImage } from "@/components/SmartImage/SmartImage";
import { useToast } from "@/components/Toast";
import { useGetInvitation } from "@/services/get-invitation";
import { useGetGuests } from "@/services/get-guests";
import { useAddGuest } from "@/services/add-guest";
import { useRemoveGuest } from "@/services/remove-guest";
import { useDeleteInvitation } from "@/services/delete-invitation";
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

function OverviewSkeleton() {
  return (
    <Container>
      <div className={styles.pageHeader}>
        <Skeleton height={28} width={84} radius={8} />
        <Skeleton height={32} width="40%" />
      </div>
      <div className={styles.sections}>
        <Card className={styles.section}>
          <Skeleton height={20} width="40%" />
          <Skeleton height={14} width="60%" />
          <Skeleton height={14} width="50%" />
        </Card>
        <Card className={styles.section}>
          <Skeleton height={20} width="40%" />
          <Skeleton height={48} />
        </Card>
        <Card className={styles.section}>
          <Skeleton height={20} width="40%" />
          <Skeleton height={64} />
        </Card>
      </div>
    </Container>
  );
}

export default function InvitationOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();

  const { data: invitation, isLoading, isError } = useGetInvitation(id);
  const { data: guests = [] } = useGetGuests(id);
  const addGuest = useAddGuest(id);
  const removeGuest = useRemoveGuest(id);
  const deleteInvitation = useDeleteInvitation();

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  async function handleConfirmDelete() {
    try {
      await deleteInvitation.mutateAsync(id);
      toast("Convite excluído.", "success");
      router.push("/dashboard");
    } catch {
      // erro renderizado via deleteInvitation.error
    }
  }

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  if (isError || !invitation) {
    return (
      <Container>
        <p>Convite não encontrado.</p>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft size={14} aria-hidden /> Voltar
          </Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.pageHeader}>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft size={14} aria-hidden /> Voltar
          </Link>
        </Button>
        <h1 className={styles.pageTitle}>{invitation.title}</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/invitations/${id}/edit`}>Editar conteúdo</Link>
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => setConfirmingDelete(true)}
        >
          <Trash2 size={14} aria-hidden /> Excluir
        </Button>
      </div>

      <div className={styles.sections}>
        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Detalhes do evento</h2>
          {invitation.coverImage && (
            <SmartImage
              src={invitation.coverImage}
              alt=""
              className={styles.cover}
            />
          )}
          <p className={styles.meta}>{formatDate(invitation.eventDate)}</p>
          <p className={styles.meta}>{invitation.eventLocation}</p>
          {invitation.description && (
            <p className={styles.description}>{invitation.description}</p>
          )}
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

      <Dialog
        open={confirmingDelete}
        onOpenChange={(open) => {
          if (!deleteInvitation.isPending) setConfirmingDelete(open);
        }}
        title="Excluir convite"
        footer={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmingDelete(false)}
              disabled={deleteInvitation.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmDelete}
              disabled={deleteInvitation.isPending}
            >
              {deleteInvitation.isPending ? "Excluindo…" : "Excluir"}
            </Button>
          </>
        }
      >
        <p className={styles.dialogText}>
          Tem certeza que deseja excluir <strong>{invitation.title}</strong>?
          Esta ação remove o convite, todos os blocos e a lista de convidados.
          Não dá para desfazer.
        </p>
        {deleteInvitation.error && (
          <p className={styles.dialogError}>
            {deleteInvitation.error.message}
          </p>
        )}
      </Dialog>
    </Container>
  );
}
