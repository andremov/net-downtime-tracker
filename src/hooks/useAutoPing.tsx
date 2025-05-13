"use client";

// a react hook that pings a server every 5 seconds and returns the response
import { useDowntimeStore } from "@/storage/downtime-store";
import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useState } from "react";

export default function useAutoPing(url: string) {
  const { setLastPingData, startDowntimeEvent, endDowntimeEvent } =
    useDowntimeStore();
  const [isPinging, setPinging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPinging(true);

      fetch(url)
        .then(() => {
          endDowntimeEvent(Temporal.Now.plainDateTimeISO());
          setLastPingData(Temporal.Now.plainDateTimeISO(), "success");
          setPinging(false);
        })
        .catch(() => {
          startDowntimeEvent(Temporal.Now.plainDateTimeISO());
          setLastPingData(Temporal.Now.plainDateTimeISO(), "failure");
          setPinging(false);
        });
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [isPinging];
}
