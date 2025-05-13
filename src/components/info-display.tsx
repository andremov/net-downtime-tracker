import { useDowntimeStore } from "@/storage/downtime-store";
import { LucideBadgeInfo } from "lucide-react";
import { useState } from "react";

export function InfoDisplay() {
  const [displayHistory, setDisplayHistory] = useState(false);
  const { lastPingTime, downtimeEvents } = useDowntimeStore();

  if (displayHistory) {
    return (
      <div
        className="border p-4 rounded-lg flex flex-col gap-2"
        onClick={() => setDisplayHistory(false)}
      >
        {downtimeEvents.length === 0 ? (
          <div>
            <span className="text-sm">No downtime events recorded.</span>
          </div>
        ) : (
          downtimeEvents.map((event, index) => (
            <div key={index} className="text-sm">
              {event.start.toLocaleString("sv-SE")} -{" "}
              {event.end?.toLocaleString("sv-SE")}
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div
      className="flex gap-2 items-center justify-center bg-gray-500 p-4 rounded-lg opacity-20 hover:opacity-60 transition"
      onClick={() => setDisplayHistory(true)}
    >
      <LucideBadgeInfo />
      <p className="text-lg">
        {lastPingTime ? lastPingTime.toLocaleString("sv-SE") : "No pings yet."}
      </p>
    </div>
  );
}
