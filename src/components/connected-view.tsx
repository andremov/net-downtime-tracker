import { LucideNetwork } from "lucide-react";

export function ConnectedView() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-green-500 text-white p-4 rounded-md flex items-center gap-2 w-fit animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]">
        <LucideNetwork />
      </div>
      <div className="absolute bg-green-500 text-white p-4 rounded-md flex items-center gap-2 w-fit">
        <LucideNetwork />
      </div>
    </div>
  );
}
