"use client";

import { ConnectedView } from "@/components/connected-view";
import { DisconnectedView } from "@/components/disconnected-view";
import { InfoDisplay } from "@/components/info-display";
import { PingingView } from "@/components/pinging-view";
import { UnknownView } from "@/components/unknown-view";
import useAutoPing from "@/hooks/useAutoPing";
import { useDowntimeStore } from "@/storage/downtime-store";

export default function Home() {
  const { lastPingResponse } = useDowntimeStore();
  const [isPinging] = useAutoPing("/api/ping");

  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col gap-4 items-center justify-between h-screen py-8 select-none">
      <PingingView isPinging={isPinging} />

      {lastPingResponse === "success" ? (
        <ConnectedView />
      ) : lastPingResponse === "failure" ? (
        <DisconnectedView />
      ) : (
        <UnknownView />
      )}

      <InfoDisplay />
    </div>
  );
}
