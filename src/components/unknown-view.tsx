import { LucideCircleHelp } from "lucide-react";

export function UnknownView() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-500 text-white p-4 rounded-md flex items-center gap-2 w-fit">
        <LucideCircleHelp />
      </div>
    </div>
  );
}
