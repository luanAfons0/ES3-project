import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Block } from "@/lib/types";

export const getBlocksKey = (id: string) => ["invitations", id, "blocks"] as const;

export function useGetBlocks(id: string) {
  return useQuery({
    queryKey: getBlocksKey(id),
    queryFn: () => apiFetch<Block[]>(`/api/invitations/${id}/blocks`),
  });
}
