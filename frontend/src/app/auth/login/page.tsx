"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Input } from "@/components/Input/Input";
import styles from "../auth.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "E-mail ou senha inválidos. Tente novamente.");
        return;
      }

      // TODO: replace with auth context / cookie when backend is connected
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <h1 className={styles.title}>Bem-vindo de volta</h1>
        <p className={styles.subtitle}>Entre na sua conta</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.formError}>{error}</p>}

        <Input
          id="email"
          type="email"
          label="E-mail"
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          id="password"
          type="password"
          label="Senha"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <Button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Entrando…" : "Entrar"}
        </Button>
      </form>

      <p className={styles.switchAuth}>
        Ainda não tem uma conta?{" "}
        <Link href="/auth/register" className={styles.switchLink}>
          Crie uma
        </Link>
      </p>
    </Card>
  );
}
