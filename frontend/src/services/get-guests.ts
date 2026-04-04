import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Guest } from "@/lib/types";

export const getGuestsKey = (id: string) => ["invitations", id, "guests"] as const;

export function useGetGuests(id: string) {
  return useQuery({
    queryKey: getGuestsKey(id),
    queryFn: () => apiFetch<Guest[]>(`/api/invitations/${id}/guests`),
  });
}
