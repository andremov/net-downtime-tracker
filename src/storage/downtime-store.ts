"use client";

// zustand store to persist downtime data
import { create } from "zustand";
import { Temporal } from "@js-temporal/polyfill";
import { DowntimeEvent } from "../utils/types";

// type for the store
type DowntimeStore = {
  lastPingTime: Temporal.PlainDateTime | null;
  lastPingResponse: "success" | "failure" | null;
  downtimeEvents: DowntimeEvent[];
  startDowntimeEvent: (startTime: Temporal.PlainDateTime) => void;
  endDowntimeEvent: (endTime: Temporal.PlainDateTime) => void;
  setLastPingData: (
    time: Temporal.PlainDateTime,
    response: "success" | "failure"
  ) => void;
  clearDowntimeEvents: () => void;
};

// create the store
export const useDowntimeStore = create<DowntimeStore>()((set, get) => ({
  lastPingResponse: null,
  lastPingTime: null,
  downtimeEvents: [],

  startDowntimeEvent: (startTime: Temporal.PlainDateTime) => {
    const { lastPingResponse } = get();
    console.log(lastPingResponse);

    if (lastPingResponse === "failure") {
      return;
    }

    const event: DowntimeEvent = {
      start: startTime,
    };

    const { downtimeEvents } = get();

    console.log("Starting downtime event", event.start.toString());

    set(() => ({
      downtimeEvents: [...downtimeEvents, event],
    }));
  },
  endDowntimeEvent: (endTime: Temporal.PlainDateTime) => {
    const { downtimeEvents, lastPingResponse } = get();

    if (lastPingResponse === "success") {
      return;
    }

    set(() => ({
      downtimeEvents: downtimeEvents.map((event, index) =>
        index === downtimeEvents.length - 1 && !event.end
          ? { ...event, end: endTime }
          : event
      ),
    }));
  },
  setLastPingData: (
    time: Temporal.PlainDateTime,
    response: "success" | "failure"
  ) =>
    set(() => ({
      lastPingTime: time,
      lastPingResponse: response,
    })),
  clearDowntimeEvents: () =>
    set(() => ({
      downtimeEvents: [],
    })),
}));
