/** Donation options shared by the donate page cards and the contact form. */
export const DONATION_TYPES = [
  "Winter Clothes",
  "Blankets",
  "Food & Meals",
  "Funds",
  "Volunteer Time",
] as const;

export type DonationType = (typeof DONATION_TYPES)[number];
