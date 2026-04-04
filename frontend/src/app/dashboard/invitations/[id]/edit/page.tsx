"use client";

import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { Input } from "@/components/Input/Input";
import { useGetInvitation } from "@/services/get-invitation";
import { useSaveInvitation } from "@/services/save-invitation";
import { useGetBlocks } from "@/services/get-blocks";
import { useSaveBlocks } from "@/services/save-blocks";
import { BlockEditor } from "../_components/BlockEditor";
import { BlockPreview } from "../_components/BlockPreview";
import type { Block } from "@/lib/types";
import styles from "./page.module.css";

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

  const { data: invitation, isLoading, isError } = useGetInvitation(id);
  const { data: fetchedBlocks } = useGetBlocks(id);
  const saveInvitation = useSaveInvitation(id);
  const saveBlocks = useSaveBlocks(id);

  const [blocksTab, setBlocksTab] = useState<"edit" | "preview">("edit");
  const [form, setForm] = useState<EditForm>({
    title: "",
    slug: "",
    eventDate: "",
    eventLocation: "",
  });
  const [blocks, setBlocks] = useState<Block[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (invitation && fetchedBlocks !== undefined && !initialized.current) {
      initialized.current = true;
      setForm({
        title: invitation.title,
        slug: invitation.slug,
        eventDate: invitation.eventDate,
        eventLocation: invitation.eventLocation,
      });
      setBlocks(fetchedBlocks);
    }
  }, [invitation, fetchedBlocks]);

  function handleFieldChange(field: keyof EditForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    try {
      await Promise.all([
        saveInvitation.mutateAsync(form),
        saveBlocks.mutateAsync(blocks),
      ]);
    } catch {
      // error rendered via saveError below
    }
  }

  const isSaving = saveInvitation.isPending || saveBlocks.isPending;
  const saveError = saveInvitation.error?.message ?? saveBlocks.error?.message;

  if (isLoading) {
    return <Container><p>Loading…</p></Container>;
  }

  if (isError || !invitation) {
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
        <Button size="sm" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving…" : "Save changes"}
        </Button>
      </div>

      {saveError && <p className={styles.saveError}>{saveError}</p>}

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
