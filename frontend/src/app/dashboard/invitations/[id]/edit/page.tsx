"use client";

import Link from "next/link";
import { use, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { Input } from "@/components/Input/Input";
import { BlockEditor, type Block } from "../_components/BlockEditor";
import { BlockPreview } from "../_components/BlockPreview";
import styles from "./page.module.css";

// TODO: replace with GET /invitations/:id + GET /invitations/:id/blocks
const MOCK_DATA: Record<
  string,
  {
    title: string;
    slug: string;
    eventDate: string;
    eventLocation: string;
    blocks: Block[];
  }
> = {
  "1": {
    title: "Ana & Lucas Wedding",
    slug: "ana-and-lucas-wedding",
    eventDate: "2026-06-15T16:00",
    eventLocation: "Grand Ballroom, São Paulo",
    blocks: [
      { id: "b1", type: "text", content: "Welcome to our wedding! We are so happy to celebrate with you." },
      { id: "b2", type: "button", content: "Confirm Attendance" },
      { id: "b3", type: "image", content: "" },
    ],
  },
  "2": {
    title: "João's 30th Birthday",
    slug: "joaos-30th-birthday",
    eventDate: "2026-04-20T19:00",
    eventLocation: "Rooftop Bar, Rio de Janeiro",
    blocks: [
      { id: "b1", type: "text", content: "Join us for João's 30th birthday party!" },
      { id: "b2", type: "button", content: "RSVP Now" },
    ],
  },
  "3": {
    title: "Tech Meetup Q2 2026",
    slug: "tech-meetup-q2-2026",
    eventDate: "2026-05-08T18:30",
    eventLocation: "Innovation Hub, Brasília",
    blocks: [],
  },
};

interface EditForm {
  title: string;
  slug: string;
  eventDate: string;
  eventLocation: string;
}

export default function InvitationEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const initial = MOCK_DATA[id];

  const [blocksTab, setBlocksTab] = useState<"edit" | "preview">("edit");
  const [form, setForm] = useState<EditForm>(
    initial
      ? {
          title: initial.title,
          slug: initial.slug,
          eventDate: initial.eventDate,
          eventLocation: initial.eventLocation,
        }
      : { title: "", slug: "", eventDate: "", eventLocation: "" }
  );
  const [blocks, setBlocks] = useState<Block[]>(initial?.blocks ?? []);

  function handleFieldChange(field: keyof EditForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    // TODO: call PUT /invitations/:id and PUT /invitations/:id/blocks/reorder
    console.log("Save", { form, blocks });
  }

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
          <Link href={`/dashboard/invitations/${id}`}>← Back</Link>
        </Button>
        <h1 className={styles.pageTitle}>{form.title || "Edit Invitation"}</h1>
        <Button size="sm" onClick={handleSave}>
          Save changes
        </Button>
      </div>

      <div className={styles.sections}>
        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Event details</h2>
          <div className={styles.fields}>
            <Input
              id="title"
              label="Title"
              value={form.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              required
            />
            <div>
              <Input
                id="slug"
                label="Slug"
                value={form.slug}
                onChange={(e) => handleFieldChange("slug", e.target.value)}
                required
              />
              <p className={styles.slugPreview}>
                {`/e/${form.slug || "your-event"}`}
              </p>
            </div>
            <Input
              id="eventDate"
              label="Event date"
              type="datetime-local"
              value={form.eventDate}
              onChange={(e) => handleFieldChange("eventDate", e.target.value)}
            />
            <Input
              id="eventLocation"
              label="Location"
              value={form.eventLocation}
              onChange={(e) => handleFieldChange("eventLocation", e.target.value)}
            />
          </div>
        </Card>

        <Card className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Content blocks</h2>
            <div className={styles.tabs}>
              <button
                className={blocksTab === "edit" ? styles.tabActive : styles.tab}
                onClick={() => setBlocksTab("edit")}
              >
                Edit
              </button>
              <button
                className={blocksTab === "preview" ? styles.tabActive : styles.tab}
                onClick={() => setBlocksTab("preview")}
              >
                Preview
              </button>
            </div>
          </div>
          {blocksTab === "edit" ? (
            <BlockEditor blocks={blocks} onChange={setBlocks} />
          ) : (
            <BlockPreview blocks={blocks} />
          )}
        </Card>
      </div>
    </Container>
  );
}
