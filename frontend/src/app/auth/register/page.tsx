"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Input } from "@/components/Input/Input";
import styles from "../auth.module.css";

export default function RegisterPage() {
  const router = useRouter();
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Algo deu errado. Tente novamente.");
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
        <h1 className={styles.title}>Criar uma conta</h1>
        <p className={styles.subtitle}>Comece a criar convites digitais</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.formError}>{error}</p>}

        <Input
          id="name"
          type="text"
          label="Nome"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />

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
          autoComplete="new-password"
          minLength={8}
        />

        <Button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Criando conta…" : "Criar conta"}
        </Button>
      </form>

      <p className={styles.switchAuth}>
        Já tem uma conta?{" "}
        <Link href="/auth/login" className={styles.switchLink}>
          Entrar
        </Link>
      </p>
    </Card>
  );
}
