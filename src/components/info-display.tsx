import { useDowntimeStore } from "@/storage/downtime-store";
import { LucideBadgeInfo } from "lucide-react";

export function InfoDisplay() {
  const { lastPingTime } = useDowntimeStore();

  return (
    <div className="flex gap-2 items-center justify-center bg-gray-500 p-4 rounded-lg opacity-20 hover:opacity-60 transition">
      <LucideBadgeInfo />
      <p className="text-lg">
        {lastPingTime ? lastPingTime.toLocaleString("sv-SE") : "No pings yet."}
      </p>
    </div>
  );
}
