import type { LivenessResult } from "@/domain/entities/Health";

let alive = false;

export function markAppAsAlive() {
  alive = true;
}

export function getLiveness(): LivenessResult {
  return {
    status: alive ? "ok" : "error",
    timestamp: new Date().toISOString(),
  };
}
