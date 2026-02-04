export type LivenessStatus = "ok" | "error";

export interface LivenessResult {
  status: LivenessStatus;
  timestamp: string;
  version?: string;
}

export type HealthStatus = "healthy" | "unhealthy" | "degraded";

export interface HealthSummary {
  status: HealthStatus;
  timestamp: string;
  liveness: LivenessResult;
}
