"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Input } from "@/components/Input/Input";
import styles from "../auth.module.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // TODO: connect to POST /auth/register
      console.log("Register", { name, email, password });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>Start creating digital invitations</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.formError}>{error}</p>}

        <Input
          id="name"
          type="text"
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />

        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          minLength={8}
        />

        <Button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className={styles.switchAuth}>
        Already have an account?{" "}
        <Link href="/auth/login" className={styles.switchLink}>
          Sign in
        </Link>
      </p>
    </Card>
  );
}
