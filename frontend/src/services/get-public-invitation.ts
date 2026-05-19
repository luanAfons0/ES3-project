import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

interface PublicInvitationMeta {
  title: string;
  eventDate: string;
  eventLocation: string;
  description: string;
  coverImage: string;
}

export const getPublicInvitationKey = (slug: string) => ["public", slug] as const;

export function useGetPublicInvitation(slug: string) {
  return useQuery({
    queryKey: getPublicInvitationKey(slug),
    queryFn: () => apiFetch<PublicInvitationMeta>(`/api/e/${slug}`),
  });
}
