export type DatabaseError =
  | "exists"
  | "success"
  | "error"
  | "not-found"
  | "invalid-input"
  | null;

export type UserProfileType = {
  id: number;
  userId: string;
  bio: string | null;
  pronouns: "Do not specify" | "They/them" | "He/him" | "She/her" | null;
  website: string | null;
} | null;

export type OldSocialMediaType = {
  userId: string;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  // github: string | null;
  // youtube: string | null;
  // twitch: string | null;
  // tiktok: string | null;
  // patreon: string | null;
  // behance: string | null;
};
