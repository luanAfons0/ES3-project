import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Invitation } from "@/lib/types";
import { getInvitationKey } from "./get-invitation";
import { getInvitationsKey } from "./get-invitations";

type SaveInvitationPayload = Pick<
  Invitation,
  "title" | "slug" | "eventDate" | "eventLocation" | "description" | "coverImage"
>;

export function useSaveInvitation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SaveInvitationPayload) =>
      apiFetch<Invitation>(`/api/invitations/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getInvitationKey(id) });
      queryClient.invalidateQueries({ queryKey: getInvitationsKey() });
    },
  });
}
