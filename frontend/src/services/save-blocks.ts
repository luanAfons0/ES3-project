import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Block } from "@/lib/types";
import { getBlocksKey } from "./get-blocks";

export function useSaveBlocks(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blocks: Block[]) =>
      apiFetch<Block[]>(`/api/invitations/${id}/blocks`, {
        method: "PUT",
        body: JSON.stringify(blocks),
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData(getBlocksKey(id), updated);
    },
  });
}
