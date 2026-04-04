import type { Block, Guest, Invitation, PublicInvitation } from "@/lib/types";

// Simulates a database. Replace all of this when the real backend is connected.

export const mockInvitations: Invitation[] = [
  {
    id: "1",
    title: "Ana & Lucas Wedding",
    slug: "ana-and-lucas-wedding",
    eventDate: "2026-06-15T16:00",
    eventLocation: "Grand Ballroom, São Paulo",
    totalGuests: 120,
    confirmed: 74,
    declined: 12,
    pending: 34,
  },
  {
    id: "2",
    title: "João's 30th Birthday",
    slug: "joaos-30th-birthday",
    eventDate: "2026-04-20T19:00",
    eventLocation: "Rooftop Bar, Rio de Janeiro",
    totalGuests: 45,
    confirmed: 28,
    declined: 5,
    pending: 12,
  },
  {
    id: "3",
    title: "Tech Meetup Q2 2026",
    slug: "tech-meetup-q2-2026",
    eventDate: "2026-05-08T18:30",
    eventLocation: "Innovation Hub, Brasília",
    totalGuests: 80,
    confirmed: 0,
    declined: 0,
    pending: 80,
  },
];

export const mockBlocks: Record<string, Block[]> = {
  "1": [
    { id: "b1", type: "text", content: "Welcome to our wedding! We are so happy to celebrate with you." },
    { id: "b2", type: "rsvp", content: "Confirm Attendance" },
    { id: "b3", type: "image", content: "" },
  ],
  "2": [
    { id: "b1", type: "text", content: "Join us for João's 30th birthday party!" },
    { id: "b2", type: "rsvp", content: "RSVP Now" },
  ],
  "3": [],
};

export const mockGuests: Record<string, Guest[]> = {
  "1": [
    { id: "g1", name: "John Smith", email: "john@example.com", rsvp: "confirmed" },
    { id: "g2", name: "Maria Souza", email: "maria@example.com", rsvp: "declined" },
    { id: "g3", name: "Carlos Lima", email: "carlos@example.com", rsvp: "pending" },
  ],
  "2": [
    { id: "g1", name: "Ana Lima", email: "ana@example.com", rsvp: "confirmed" },
  ],
  "3": [],
};

export const mockPublicInvitations: Record<string, PublicInvitation> = {
  "ana-and-lucas-wedding": {
    title: "Ana & Lucas Wedding",
    eventDate: "2026-06-15T16:00",
    eventLocation: "Grand Ballroom, São Paulo",
    blocks: mockBlocks["1"],
    guestEmails: mockGuests["1"].map((g) => g.email),
  },
  "joaos-30th-birthday": {
    title: "João's 30th Birthday",
    eventDate: "2026-04-20T19:00",
    eventLocation: "Rooftop Bar, Rio de Janeiro",
    blocks: mockBlocks["2"],
    guestEmails: mockGuests["2"].map((g) => g.email),
  },
  "tech-meetup-q2-2026": {
    title: "Tech Meetup Q2 2026",
    eventDate: "2026-05-08T18:30",
    eventLocation: "Innovation Hub, Brasília",
    blocks: mockBlocks["3"],
    guestEmails: [],
  },
};
