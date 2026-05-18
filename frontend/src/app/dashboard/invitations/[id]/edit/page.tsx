"use client";

import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button/Button";
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

  const [canvasMode, setCanvasMode] = useState<"edit" | "preview">("edit");
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
    return <div className={styles.stateMessage}>Carregando…</div>;
  }

  if (isError || !invitation) {
    return (
      <div className={styles.stateMessage}>
        <p>Convite não encontrado.</p>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">← Voltar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/invitations/${id}`}>← Voltar</Link>
        </Button>
        <h1 className={styles.pageTitle}>{form.title || "Editar convite"}</h1>
        {saveError && <span className={styles.saveError}>{saveError}</span>}
        <Button size="sm" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Salvando…" : "Salvar alterações"}
        </Button>
      </div>

      <div className={styles.body}>
        <aside className={styles.panel}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Detalhes do evento</h2>
            <div className={styles.fields}>
              <Input
                id="title"
                label="Título"
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
                  {`/e/${form.slug || "seu-evento"}`}
                </p>
              </div>
              <Input
                id="eventDate"
                label="Data do evento"
                type="datetime-local"
                value={form.eventDate}
                onChange={(e) => handleFieldChange("eventDate", e.target.value)}
              />
              <Input
                id="eventLocation"
                label="Local"
                value={form.eventLocation}
                onChange={(e) =>
                  handleFieldChange("eventLocation", e.target.value)
                }
              />
            </div>
          </section>
        </aside>

        <div className={styles.canvas}>
          <div className={styles.canvasDoc}>
            <div className={styles.canvasHeader}>
              <span className={styles.canvasLabel}>Blocos de conteúdo</span>
              <div className={styles.modeTabs}>
                <button
                  className={canvasMode === "edit" ? styles.modeTabActive : styles.modeTab}
                  onClick={() => setCanvasMode("edit")}
                >
                  Editar
                </button>
                <button
                  className={canvasMode === "preview" ? styles.modeTabActive : styles.modeTab}
                  onClick={() => setCanvasMode("preview")}
                >
                  Pré-visualizar
                </button>
              </div>
            </div>

            <div className={styles.canvasBody}>
              {canvasMode === "edit" ? (
                <BlockEditor blocks={blocks} onChange={setBlocks} />
              ) : (
                <BlockPreview blocks={blocks} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
