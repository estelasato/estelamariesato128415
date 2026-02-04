import type { HealthSummary } from "@/domain/entities/Health";
import { getLiveness } from "./liveness";

export function getHealth(): HealthSummary {
  const liveness = getLiveness();

  const status =
    liveness.status === "ok" ? "healthy" : "unhealthy";

  return {
    status,
    timestamp: new Date().toISOString(),
    liveness,
  };
}
