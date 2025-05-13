import { LucideNetwork } from "lucide-react";

export function DisconnectedView() {
  return (
    <div className="bg-rose-700 text-white p-4 rounded-md flex items-center gap-2 animate-pulse">
      <LucideNetwork />
    </div>
  );
}
