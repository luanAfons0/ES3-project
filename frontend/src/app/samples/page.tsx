"use client";

import { useState } from "react";
import { Button, Card, Container, Dialog, Input, Switch, ThemeToggle } from "@/components";
import styles from "./page.module.css";

export default function SamplePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <Container>
      <div className={styles.page}>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Button — variants</span>
          <div className={styles.row}>
            <Button variant="primary">Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Button — sizes</span>
          <div className={styles.row}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Input</span>
          <div className={styles.row}>
            <Input
              id="sample-input"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              id="sample-error"
              label="Password"
              type="password"
              placeholder="••••••••"
              error="Password is required"
            />
            <Input
              id="sample-disabled"
              label="Disabled"
              placeholder="Not editable"
              disabled
            />
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Card</span>
          <div className={styles.row}>
            <Card>
              <div className={styles.cardContent}>
                <h3>Wedding Invitation</h3>
                <p>Ana & Lucas · June 14, 2026 · São Paulo</p>
              </div>
            </Card>
            <Card>
              <div className={styles.cardContent}>
                <h3>Birthday Party</h3>
                <p>Maria · July 3, 2026 · Rio de Janeiro</p>
              </div>
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Switch</span>
          <div className={styles.row}>
            <Switch id="s1" checked={switchOn} onCheckedChange={setSwitchOn} label="Notifications" />
            <Switch id="s2" checked={true} onCheckedChange={() => {}} label="Always on" />
            <Switch id="s3" checked={false} onCheckedChange={() => {}} label="Disabled" disabled />
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Theme</span>
          <div className={styles.row}>
            <ThemeToggle />
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionTitle}>Dialog</span>
          <div className={styles.row}>
            <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          </div>
          <Dialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Confirm action"
            footer={
              <>
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => setDialogOpen(false)}>
                  Delete
                </Button>
              </>
            }
          >
            <p>Are you sure you want to delete this invitation? This action cannot be undone.</p>
          </Dialog>
        </section>

      </div>
    </Container>
  );
}
