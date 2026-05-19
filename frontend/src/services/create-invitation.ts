import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Invitation } from "@/lib/types";
import { getInvitationsKey } from "./get-invitations";

type CreateInvitationPayload = Pick<
  Invitation,
  "title" | "slug" | "eventDate" | "eventLocation"
> &
  Partial<Pick<Invitation, "description" | "coverImage">>;

export function useCreateInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInvitationPayload) =>
      apiFetch<Invitation>("/api/invitations", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getInvitationsKey() });
    },
  });
}
