"use client";

import { use, useState } from "react";
import { RsvpButton } from "@/app/dashboard/invitations/[id]/_components/RsvpButton";
import type { Block } from "@/app/dashboard/invitations/[id]/_components/BlockEditor";
import styles from "./page.module.css";

// TODO: replace with GET /e/:slug (public endpoint — no auth required)
const MOCK_INVITATIONS: Record<
  string,
  {
    title: string;
    eventDate: string;
    eventLocation: string;
    blocks: Block[];
    guestEmails: string[];
  }
> = {
  "ana-and-lucas-wedding": {
    title: "Ana & Lucas Wedding",
    eventDate: "2026-06-15T16:00",
    eventLocation: "Grand Ballroom, São Paulo",
    blocks: [
      { id: "b1", type: "text", content: "Welcome to our wedding! We are so happy to celebrate with you." },
      { id: "b2", type: "rsvp", content: "Confirm Attendance" },
      { id: "b3", type: "image", content: "" },
    ],
    guestEmails: ["john@example.com", "maria@example.com", "carlos@example.com"],
  },
  "joaos-30th-birthday": {
    title: "João's 30th Birthday",
    eventDate: "2026-04-20T19:00",
    eventLocation: "Rooftop Bar, Rio de Janeiro",
    blocks: [
      { id: "b1", type: "text", content: "Join us for João's 30th birthday party!" },
      { id: "b2", type: "rsvp", content: "RSVP Now" },
    ],
    guestEmails: ["ana@example.com"],
  },
  "tech-meetup-q2-2026": {
    title: "Tech Meetup Q2 2026",
    eventDate: "2026-05-08T18:30",
    eventLocation: "Innovation Hub, Brasília",
    blocks: [],
    guestEmails: [],
  },
};

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

type PageState = "gate" | "viewing" | "confirmed" | "declined";

export default function PublicInvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const invitation = MOCK_INVITATIONS[slug];

  const [state, setState] = useState<PageState>("gate");
  const [email, setEmail] = useState("");
  const [gateError, setGateError] = useState("");

  if (!invitation) {
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

  function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGateError("");
    // TODO: replace with POST /e/:slug/access — validates email server-side
    const found = invitation.guestEmails.some(
      (g) => g.toLowerCase() === email.trim().toLowerCase()
    );
    if (!found) {
      setGateError("This email is not on the guest list.");
      return;
    }
    setState("viewing");
  }

  if (state === "gate") {
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
            {gateError && <p className={styles.gateError}>{gateError}</p>}
            <button type="submit" className={styles.gateButton}>
              Access invitation
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (state === "confirmed" || state === "declined") {
    return (
      <div className={styles.page}>
        <div className={styles.responded}>
          {state === "confirmed" ? (
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
              <h1 className={styles.respondedTitle}>We'll miss you.</h1>
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
          {invitation.blocks.map((block) => {
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
                    onClick={() => setState("confirmed")}
                  />
                  <button
                    className={styles.declineButton}
                    onClick={() => setState("declined")}
                  >
                    Can&apos;t make it
                  </button>
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
