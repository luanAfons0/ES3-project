import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Guest } from "@/lib/types";
import { getGuestsKey } from "./get-guests";

type AddGuestPayload = Pick<Guest, "name" | "email">;

export function useAddGuest(invitationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddGuestPayload) =>
      apiFetch<Guest>(`/api/invitations/${invitationId}/guests`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (newGuest) => {
      queryClient.setQueryData<Guest[]>(getGuestsKey(invitationId), (prev) =>
        prev ? [...prev, newGuest] : [newGuest]
      );
    },
  });
}
