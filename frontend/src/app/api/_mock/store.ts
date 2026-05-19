import type { Block, Guest, Invitation, PublicInvitation } from "@/lib/types";

// Simulates a database. Replace all of this when the real backend is connected.

export const mockInvitations: Invitation[] = [
  {
    id: "1",
    title: "Casamento Ana & Lucas",
    slug: "casamento-ana-e-lucas",
    eventDate: "2026-06-15T16:00",
    eventLocation: "Salão de Festas, São Paulo",
    description:
      "Depois de oito anos juntos, é hora de celebrar com quem sempre esteve perto. Venha brindar essa nova fase com a gente.",
    coverImage: "",
    totalGuests: 120,
    confirmed: 74,
    declined: 12,
    pending: 34,
  },
  {
    id: "2",
    title: "Aniversário de 30 anos do João",
    slug: "aniversario-30-anos-joao",
    eventDate: "2026-04-20T19:00",
    eventLocation: "Bar Rooftop, Rio de Janeiro",
    description:
      "Trinta anos pedem uma boa festa. Música, drinks autorais e a vista mais linda da cidade.",
    coverImage: "",
    totalGuests: 45,
    confirmed: 28,
    declined: 5,
    pending: 12,
  },
  {
    id: "3",
    title: "Tech Meetup 2º trimestre 2026",
    slug: "tech-meetup-2-trimestre-2026",
    eventDate: "2026-05-08T18:30",
    eventLocation: "Hub de Inovação, Brasília",
    description:
      "Tarde de talks sobre engenharia de plataformas, IA aplicada e o futuro do trabalho remoto.",
    coverImage: "",
    totalGuests: 80,
    confirmed: 0,
    declined: 0,
    pending: 80,
  },
];

export const mockBlocks: Record<string, Block[]> = {
  "1": [
    { id: "b1", type: "text", content: "Sejam bem-vindos ao nosso casamento! Estamos muito felizes em celebrar com vocês." },
    { id: "b2", type: "rsvp", content: "Confirmar presença" },
    { id: "b3", type: "image", content: "" },
  ],
  "2": [
    { id: "b1", type: "text", content: "Venha comemorar os 30 anos do João!" },
    { id: "b2", type: "rsvp", content: "Confirmar agora" },
  ],
  "3": [],
};

export const mockGuests: Record<string, Guest[]> = {
  "1": [
    { id: "g1", name: "João Silva", email: "joao@exemplo.com", rsvp: "confirmed" },
    { id: "g2", name: "Maria Souza", email: "maria@exemplo.com", rsvp: "declined" },
    { id: "g3", name: "Carlos Lima", email: "carlos@exemplo.com", rsvp: "pending" },
  ],
  "2": [
    { id: "g1", name: "Ana Lima", email: "ana@exemplo.com", rsvp: "confirmed" },
  ],
  "3": [],
};

export const mockPublicInvitations: Record<string, PublicInvitation> = {
  "casamento-ana-e-lucas": {
    title: "Casamento Ana & Lucas",
    eventDate: "2026-06-15T16:00",
    eventLocation: "Salão de Festas, São Paulo",
    description: mockInvitations[0].description,
    coverImage: mockInvitations[0].coverImage,
    blocks: mockBlocks["1"],
    guestEmails: mockGuests["1"].map((g) => g.email),
  },
  "aniversario-30-anos-joao": {
    title: "Aniversário de 30 anos do João",
    eventDate: "2026-04-20T19:00",
    eventLocation: "Bar Rooftop, Rio de Janeiro",
    description: mockInvitations[1].description,
    coverImage: mockInvitations[1].coverImage,
    blocks: mockBlocks["2"],
    guestEmails: mockGuests["2"].map((g) => g.email),
  },
  "tech-meetup-2-trimestre-2026": {
    title: "Tech Meetup 2º trimestre 2026",
    eventDate: "2026-05-08T18:30",
    eventLocation: "Hub de Inovação, Brasília",
    description: mockInvitations[2].description,
    coverImage: mockInvitations[2].coverImage,
    blocks: mockBlocks["3"],
    guestEmails: [],
  },
};
