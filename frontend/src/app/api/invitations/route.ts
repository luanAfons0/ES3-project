import { NextResponse } from "next/server";

// Mock data — replace with real DB query when backend is connected.
const MOCK_INVITATIONS = [
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

export async function GET() {
  return NextResponse.json(MOCK_INVITATIONS);
}
