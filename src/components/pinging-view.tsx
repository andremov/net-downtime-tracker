import { LucideCheck, LucideLoaderCircle } from "lucide-react";

type PingingViewProps = {
  isPinging: boolean;
};

export function PingingView({ isPinging }: PingingViewProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={
          " text-white p-2 rounded-md flex items-center gap-2 w-fit transition-opacity " +
          (isPinging ? "bg-yellow-500 opacity-75" : "bg-green-500 opacity-25")
        }
      >
        {isPinging ? (
          <LucideLoaderCircle strokeWidth={5} className="animate-spin" />
        ) : (
          <LucideCheck strokeWidth={3} />
        )}
      </div>
    </div>
  );
}
