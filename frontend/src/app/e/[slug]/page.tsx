"use client";

import { use, useState } from "react";
import { RsvpButton } from "@/app/dashboard/invitations/[id]/_components/RsvpButton";
import { useGetPublicInvitation } from "@/services/get-public-invitation";
import { useAccessInvitation } from "@/services/access-invitation";
import { useSubmitRsvp } from "@/services/submit-rsvp";
import type { Block } from "@/lib/types";
import styles from "./page.module.css";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ViewState = "gate" | "viewing" | "confirmed" | "declined";

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

  if (isLoading) {
    return (
      <div className={styles.page}>
        <p>Loading…</p>
      </div>
    );
  }

  if (isError || !invitation) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Invitation not found</h1>
          <p className={styles.notFoundText}>
            This link may be invalid or the invitation may no longer be available.
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
      setViewState("viewing");
    } catch {
      // error shown via accessInvitation.error
    }
  }

  async function handleRsvp(status: "confirmed" | "declined") {
    try {
      await submitRsvp.mutateAsync({ email, status });
      setViewState(status);
    } catch {
      // error rendered via submitRsvp.error below
    }
  }

  if (viewState === "gate") {
    return (
      <div className={styles.page}>
        <div className={styles.gate}>
          <h1 className={styles.gateTitle}>{invitation.title}</h1>
          <p className={styles.gateSubtitle}>Enter your email to access this invitation.</p>
          <form onSubmit={handleGateSubmit} className={styles.gateForm}>
            <input
              className={styles.gateInput}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            {accessInvitation.error && (
              <p className={styles.gateError}>{accessInvitation.error.message}</p>
            )}
            <button
              type="submit"
              className={styles.gateButton}
              disabled={accessInvitation.isPending}
            >
              {accessInvitation.isPending ? "Checking…" : "Access invitation"}
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
              <span className={styles.respondedIcon} aria-hidden>✓</span>
              <h1 className={styles.respondedTitle}>See you there!</h1>
              <p className={styles.respondedText}>
                Your attendance for <strong>{invitation.title}</strong> has been confirmed.
              </p>
            </>
          ) : (
            <>
              <span className={styles.respondedIcon} aria-hidden>✕</span>
              <h1 className={styles.respondedTitle}>We&apos;ll miss you.</h1>
              <p className={styles.respondedText}>
                Your decline for <strong>{invitation.title}</strong> has been recorded.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.invitation}>
        <header className={styles.invitationHeader}>
          <h1 className={styles.invitationTitle}>{invitation.title}</h1>
          <p className={styles.invitationMeta}>{formatDate(invitation.eventDate)}</p>
          <p className={styles.invitationMeta}>{invitation.eventLocation}</p>
        </header>

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
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={block.id}
                  src={block.content}
                  alt=""
                  className={styles.imageBlock}
                />
              );
            }

            if (block.type === "button") {
              return (
                <div key={block.id} className={styles.buttonWrapper}>
                  <button className={styles.genericButton}>{block.content}</button>
                </div>
              );
            }

            if (block.type === "rsvp") {
              return (
                <div key={block.id} className={styles.rsvpWrapper}>
                  <RsvpButton
                    label={block.content || "Confirm Attendance"}
                    onClick={() => handleRsvp("confirmed")}
                    disabled={submitRsvp.isPending}
                  />
                  <button
                    className={styles.declineButton}
                    onClick={() => handleRsvp("declined")}
                    disabled={submitRsvp.isPending}
                  >
                    Can&apos;t make it
                  </button>
                  {submitRsvp.error && (
                    <p className={styles.rsvpError}>{submitRsvp.error.message}</p>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
