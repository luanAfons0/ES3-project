import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Invitation } from "@/lib/types";

export const getInvitationKey = (id: string) => ["invitations", id] as const;

export function useGetInvitation(id: string) {
  return useQuery({
    queryKey: getInvitationKey(id),
    queryFn: () => apiFetch<Invitation>(`/api/invitations/${id}`),
  });
}
