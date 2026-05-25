export interface Snippet {
  text: string;
  createdAt: number;
}

export interface CreateResponse {
  code: string;
  expiresAt: number;
}

export interface FetchResponse {
  text: string;
  ttl: number;
}

export interface ApiError {
  error: string;
}

export type ExpiryOption = 60 | 600 | 3600;

export const EXPIRY_LABELS: Record<ExpiryOption, string> = {
  60: "1 minute",
  600: "10 minutes",
  3600: "1 hour",
};
