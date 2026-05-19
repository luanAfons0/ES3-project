"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Container } from "@/components/Container/Container";
import { Input } from "@/components/Input/Input";
import { useCreateInvitation } from "@/services/create-invitation";
import styles from "./page.module.css";

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface NewInvitationForm {
  title: string;
  slug: string;
  eventDate: string;
  eventLocation: string;
}

export default function NewInvitationPage() {
  const router = useRouter();
  const createInvitation = useCreateInvitation();

  const [form, setForm] = useState<NewInvitationForm>({
    title: "",
    slug: "",
    eventDate: "",
    eventLocation: "",
  });
  const [slugTouched, setSlugTouched] = useState(false);

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  }

  function handleSlugChange(value: string) {
    setSlugTouched(true);
    setForm((prev) => ({ ...prev, slug: slugify(value) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const created = await createInvitation.mutateAsync(form);
      router.push(`/dashboard/invitations/${created.id}/edit`);
    } catch {
      // erro renderizado via createInvitation.error
    }
  }

  return (
    <Container>
      <div className={styles.wrapper}>
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Novo convite</h1>
            <p className={styles.subtitle}>
              Preencha os dados básicos do evento. Você poderá editar tudo
              depois.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {createInvitation.error && (
              <p className={styles.formError}>
                {createInvitation.error.message}
              </p>
            )}

            <Input
              id="title"
              label="Título"
              placeholder="Casamento da Ana e do Lucas"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              autoFocus
            />

            <div>
              <Input
                id="slug"
                label="Slug"
                placeholder="casamento-ana-e-lucas"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
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
              onChange={(e) =>
                setForm((prev) => ({ ...prev, eventDate: e.target.value }))
              }
              required
            />

            <Input
              id="eventLocation"
              label="Local"
              placeholder="Salão de Festas, São Paulo"
              value={form.eventLocation}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  eventLocation: e.target.value,
                }))
              }
              required
            />

            <div className={styles.actions}>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Cancelar</Link>
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={createInvitation.isPending}
              >
                {createInvitation.isPending ? "Criando…" : "Criar convite"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
