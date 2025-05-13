"use client";

// a react hook that pings a server every 5 seconds and returns the response
import { useDowntimeStore } from "@/storage/downtime-store";
import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useState } from "react";

export default function useAutoPing(url: string) {
  const { setLastPingData } = useDowntimeStore();
  const [isPinging, setPinging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPinging(true);

      fetch(url)
        .then(() => {
          setPinging(false);
          setLastPingData(Temporal.Now.plainDateTimeISO(), "success");
        })
        .catch(() => {
          setPinging(false);
          setLastPingData(Temporal.Now.plainDateTimeISO(), "failure");
        });
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [isPinging];
}
