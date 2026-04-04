import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Guest } from "@/lib/types";
import { getGuestsKey } from "./get-guests";

export function useRemoveGuest(invitationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (guestId: string) =>
      apiFetch(`/api/invitations/${invitationId}/guests/${guestId}`, {
        method: "DELETE",
      }),
    onSuccess: (_data, guestId) => {
      queryClient.setQueryData<Guest[]>(getGuestsKey(invitationId), (prev) =>
        prev ? prev.filter((g) => g.id !== guestId) : []
      );
    },
  });
}
