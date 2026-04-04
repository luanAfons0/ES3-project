import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Invitation } from "@/lib/types";

export const getInvitationsKey = () => ["invitations"] as const;

export function useGetInvitations() {
  return useQuery({
    queryKey: getInvitationsKey(),
    queryFn: () => apiFetch<Invitation[]>("/api/invitations"),
  });
}
