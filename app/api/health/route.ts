import { NextResponse } from "next/server";
import { BUILD_SHA, BUILD_TIME } from "@/lib/build-info.generated";

export const dynamic = "force-dynamic";

export async function GET() {
  const listenPort = 3100;
  const payload = {
    ok: true,
    buildSha: BUILD_SHA,
    builtAt: BUILD_TIME,
    listenPort,
    portEnv: process.env.PORT ?? null,
    nodeEnv: process.env.NODE_ENV ?? "development",
  };

  // #region agent log
  fetch("http://127.0.0.1:7244/ingest/d6bebdad-0670-43eb-bb25-d35499f0ed21", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "020f2d",
    },
    body: JSON.stringify({
      sessionId: "020f2d",
      runId: "health",
      hypothesisId: "H1-port",
      location: "app/api/health/route.ts:GET",
      message: "health check",
      data: payload,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return NextResponse.json(payload);
}
