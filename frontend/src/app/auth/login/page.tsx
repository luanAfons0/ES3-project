"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Input } from "@/components/Input/Input";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "../auth.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      const next = searchParams.get("next");
      router.push(next && next.startsWith("/") ? next : "/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Algo deu errado. Tente novamente.",
      );
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

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
