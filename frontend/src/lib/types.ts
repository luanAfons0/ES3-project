export type BlockType = "text" | "image" | "button" | "rsvp";

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  link?: string;
}

export type RsvpStatus = "pending" | "confirmed" | "declined";

export interface Guest {
  id: string;
  name: string;
  email: string;
  rsvp: RsvpStatus;
}

export interface Invitation {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  eventLocation: string;
  description: string;
  coverImage: string;
  totalGuests: number;
  confirmed: number;
  declined: number;
  pending: number;
}

export interface PublicInvitation {
  title: string;
  eventDate: string;
  eventLocation: string;
  description: string;
  coverImage: string;
  blocks: Block[];
  guestEmails: string[];
}
