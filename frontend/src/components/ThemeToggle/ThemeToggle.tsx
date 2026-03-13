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

  if (!mounted) return <Switch id="theme-toggle" checked={false} onCheckedChange={() => {}} label="Theme" disabled />;

  return (
    <Switch
      id="theme-toggle"
      checked={theme === "dark"}
      onCheckedChange={toggle}
      label={theme === "dark" ? "Dark mode" : "Light mode"}
    />
  );
}

export { ThemeToggle };
