"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/Switch/Switch";
import { useTheme } from "@/components/ThemeProvider/ThemeProvider";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Switch id="theme-toggle" checked={false} onCheckedChange={() => {}} label="Tema" disabled />;

  return (
    <Switch
      id="theme-toggle"
      checked={theme === "dark"}
      onCheckedChange={toggle}
      label={theme === "dark" ? "Modo escuro" : "Modo claro"}
    />
  );
}

export { ThemeToggle };
