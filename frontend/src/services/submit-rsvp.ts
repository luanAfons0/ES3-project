import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { RsvpStatus } from "@/lib/types";

interface RsvpPayload {
  email: string;
  status: RsvpStatus;
}

export function useSubmitRsvp(slug: string) {
  return useMutation({
    mutationFn: (data: RsvpPayload) =>
      apiFetch(`/api/e/${slug}/rsvp`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}
