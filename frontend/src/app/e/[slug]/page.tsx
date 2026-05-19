"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { use, useEffect, useState } from "react";
import { RsvpButton } from "@/app/dashboard/invitations/[id]/_components/RsvpButton";
import { SmartImage } from "@/components/SmartImage/SmartImage";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { useGetPublicInvitation } from "@/services/get-public-invitation";
import { useAccessInvitation } from "@/services/access-invitation";
import { useSubmitRsvp } from "@/services/submit-rsvp";
import type { Block } from "@/lib/types";
import styles from "./page.module.css";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ViewState = "gate" | "viewing" | "confirmed" | "declined";

function rsvpStorageKey(slug: string, email: string): string {
  return `wellcard:rsvp:${slug}:${email.toLowerCase().trim()}`;
}

function readStoredRsvp(slug: string, email: string): "confirmed" | "declined" | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(rsvpStorageKey(slug, email));
    return v === "confirmed" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

function writeStoredRsvp(slug: string, email: string, status: "confirmed" | "declined"): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(rsvpStorageKey(slug, email), status);
  } catch {
    // storage quota / private mode — non-fatal
  }
}

export default function PublicInvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data: invitation, isLoading, isError } = useGetPublicInvitation(slug);
  const accessInvitation = useAccessInvitation(slug);
  const submitRsvp = useSubmitRsvp(slug);

  const [viewState, setViewState] = useState<ViewState>("gate");
  const [email, setEmail] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);

  // Restore last RSVP for this slug if the same browser was used before.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const prefix = `wellcard:rsvp:${slug}:`;
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (!key || !key.startsWith(prefix)) continue;
        const status = window.localStorage.getItem(key);
        if (status === "confirmed" || status === "declined") {
          setEmail(key.slice(prefix.length));
          setViewState(status);
          break;
        }
      }
    } catch {
      // storage unavailable
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.gate}>
          <Skeleton height={32} width="60%" />
          <Skeleton height={16} width="80%" />
          <Skeleton height={44} radius={12} />
        </div>
      </div>
    );
  }

  if (isError || !invitation) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Convite não encontrado</h1>
          <p className={styles.notFoundText}>
            Este link pode estar inválido ou o convite pode não estar mais disponível.
          </p>
        </div>
      </div>
    );
  }

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await accessInvitation.mutateAsync(email);
      setBlocks(result.blocks);
      const stored = readStoredRsvp(slug, email);
      setViewState(stored ?? "viewing");
    } catch {
      // error shown via accessInvitation.error
    }
  }

  async function handleRsvp(status: "confirmed" | "declined") {
    try {
      await submitRsvp.mutateAsync({ email, status });
      writeStoredRsvp(slug, email, status);
      setViewState(status);
    } catch {
      // error rendered via submitRsvp.error below
    }
  }

  if (viewState === "gate") {
    return (
      <div className={styles.page}>
        <div className={styles.gate}>
          {invitation.coverImage && (
            <SmartImage
              src={invitation.coverImage}
              alt=""
              className={styles.coverImage}
            />
          )}
          <h1 className={styles.gateTitle}>{invitation.title}</h1>
          <p className={styles.gateSubtitle}>Informe seu e-mail para acessar este convite.</p>
          <form onSubmit={handleGateSubmit} className={styles.gateForm}>
            <input
              className={styles.gateInput}
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-invalid={accessInvitation.error ? true : undefined}
            />
            {accessInvitation.error && (
              <p className={styles.gateError} role="alert">
                {accessInvitation.error.message}
              </p>
            )}
            <button
              type="submit"
              className={styles.gateButton}
              disabled={accessInvitation.isPending}
            >
              {accessInvitation.isPending ? "Verificando…" : "Acessar convite"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (viewState === "confirmed" || viewState === "declined") {
    return (
      <div className={styles.page}>
        <div className={styles.responded}>
          {viewState === "confirmed" ? (
            <>
              <CheckCircle2 size={56} className={styles.respondedIconConfirmed} aria-hidden />
              <h1 className={styles.respondedTitle}>Até lá!</h1>
              <p className={styles.respondedText}>
                Sua presença em <strong>{invitation.title}</strong> foi confirmada.
              </p>
            </>
          ) : (
            <>
              <XCircle size={56} className={styles.respondedIconDeclined} aria-hidden />
              <h1 className={styles.respondedTitle}>Vamos sentir sua falta.</h1>
              <p className={styles.respondedText}>
                Sua recusa em <strong>{invitation.title}</strong> foi registrada.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  const hasRsvpBlock = blocks.some((b) => b.type === "rsvp");

  return (
    <div className={styles.page}>
      <div className={styles.invitation}>
        {invitation.coverImage && (
          <SmartImage
            src={invitation.coverImage}
            alt=""
            className={styles.coverImage}
          />
        )}
        <header className={styles.invitationHeader}>
          <h1 className={styles.invitationTitle}>{invitation.title}</h1>
          <p className={styles.invitationMeta}>{formatDate(invitation.eventDate)}</p>
          <p className={styles.invitationMeta}>{invitation.eventLocation}</p>
        </header>

        {invitation.description && (
          <p className={styles.invitationDescription}>{invitation.description}</p>
        )}

        <div className={styles.blocks}>
          {blocks.map((block) => {
            if (block.type === "text") {
              return (
                <p key={block.id} className={styles.textBlock}>
                  {block.content}
                </p>
              );
            }

            if (block.type === "image" && block.content) {
              return (
                <SmartImage
                  key={block.id}
                  src={block.content}
                  alt=""
                  className={styles.imageBlock}
                />
              );
            }

            if (block.type === "button") {
              const label = block.content || "Saiba mais";
              if (block.link) {
                return (
                  <div key={block.id} className={styles.buttonWrapper}>
                    <a
                      className={styles.genericButton}
                      href={block.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label}
                    </a>
                  </div>
                );
              }
              return (
                <div key={block.id} className={styles.buttonWrapper}>
                  <button className={styles.genericButton} disabled>
                    {label}
                  </button>
                </div>
              );
            }

            if (block.type === "rsvp") {
              return (
                <RsvpBlockUI
                  key={block.id}
                  label={block.content || "Confirmar presença"}
                  onConfirm={() => handleRsvp("confirmed")}
                  onDecline={() => handleRsvp("declined")}
                  isPending={submitRsvp.isPending}
                  error={submitRsvp.error?.message}
                />
              );
            }

            return null;
          })}

          {!hasRsvpBlock && (
            <RsvpBlockUI
              label="Confirmar presença"
              onConfirm={() => handleRsvp("confirmed")}
              onDecline={() => handleRsvp("declined")}
              isPending={submitRsvp.isPending}
              error={submitRsvp.error?.message}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface RsvpBlockUIProps {
  label: string;
  onConfirm: () => void;
  onDecline: () => void;
  isPending: boolean;
  error?: string;
}

function RsvpBlockUI({ label, onConfirm, onDecline, isPending, error }: RsvpBlockUIProps) {
  return (
    <div className={styles.rsvpWrapper}>
      <RsvpButton label={label} onClick={onConfirm} disabled={isPending} />
      <button
        type="button"
        className={styles.declineButton}
        onClick={onDecline}
        disabled={isPending}
      >
        Não vou poder ir
      </button>
      {error && (
        <p className={styles.rsvpError} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
