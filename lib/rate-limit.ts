import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

// Separate limiters for create vs fetch — different thresholds
export const createRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: false,
  prefix: "cliplink:rl:create",
});

export const fetchRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: false,
  prefix: "cliplink:rl:fetch",
});
