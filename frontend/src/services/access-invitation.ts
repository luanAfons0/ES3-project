import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Block } from "@/lib/types";

interface AccessResponse {
  blocks: Block[];
}

export function useAccessInvitation(slug: string) {
  return useMutation({
    mutationFn: (email: string) =>
      apiFetch<AccessResponse>(`/api/e/${slug}/access`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
  });
}
