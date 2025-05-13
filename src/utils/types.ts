import { Temporal } from "@js-temporal/polyfill";

// type for a net downtime event entry
export type DowntimeEvent = {
  start: Temporal.PlainDateTime;
  end?: Temporal.PlainDateTime;
};
