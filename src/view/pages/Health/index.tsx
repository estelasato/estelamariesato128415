import { CheckCircle2, XCircle, RefreshCw, AlertCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  getHealth,
  type HealthSummary,
  type LivenessStatus,
} from "@/app/health";
import { Button } from "@/view/components/ui/button";

type FetchStatus = "idle" | "success" | "error";

export default function Health() {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [data, setData] = useState<HealthSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runHealthCheck = useCallback(() => {
    setError(null);
    try {
      const result = getHealth();
      setData(result);
      setFetchStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao obter health");
      setFetchStatus("error");
    }
  }, []);

  useEffect(() => {
    runHealthCheck();
  }, [runHealthCheck]);

  const isHealthy = data?.status === "healthy";
  const isUnhealthy = data?.status === "unhealthy" || fetchStatus === "error";
  const isDegraded = data?.status === "degraded";

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-orange-300/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -top-20 right-0 w-80 h-80 bg-gradient-to-bl from-secondary/25 to-emerald-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 backdrop-blur-xl shadow-2xl bg-background/80 rounded-lg p-8 sm:p-10 w-full max-w-md mx-6">
        <div className="flex flex-col items-center gap-4">
          {fetchStatus === "success" && data && (
            <>
              {isHealthy && (
                <CheckCircle2 className="size-16 text-emerald-500" aria-hidden />
              )}
              {isDegraded && (
                <AlertCircle className="size-16 text-amber-500" aria-hidden />
              )}
              {isUnhealthy && (
                <XCircle className="size-16 text-destructive" aria-hidden />
              )}
            </>
          )}
          {fetchStatus === "error" && (
            <XCircle className="size-16 text-destructive" aria-hidden />
          )}

          <h1 className="text-2xl font-extrabold text-center">
            <span className="bg-gradient-to-r from-orange-700 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              Health Check
            </span>
          </h1>

          <p className="text-lg font-semibold text-foreground capitalize">
            {fetchStatus === "error"
              ? "Erro"
              : data?.status ?? "—"}
          </p>

          {fetchStatus === "success" && data && (
            <div className="w-full space-y-3 text-left">
              <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2">
                <span className="font-medium text-muted-foreground">Liveness</span>
                <StatusBadge status={data.liveness.status} />
              </div>
            </div>
          )}

          {error && (
            <p className="w-full text-sm text-destructive text-center" role="alert">
              {error}
            </p>
          )}

          <pre className="w-full mt-2 p-4 rounded-lg bg-muted/50 text-muted-foreground font-mono text-xs overflow-x-auto">
            {data ? JSON.stringify(data, null, 2) : "—"}
          </pre>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={runHealthCheck}
            className="gap-2"
          >
            <RefreshCw className="size-4" />
            Atualizar
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: LivenessStatus }) {
  const isOk = status === "ok";
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        isOk ? "bg-emerald-500/20 text-emerald-700" : "bg-destructive/20 text-destructive"
      }`}
    >
      {status}
    </span>
  );
}
