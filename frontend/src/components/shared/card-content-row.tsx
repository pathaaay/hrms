import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const CardContentRow = ({
  Icon,
  label,
  value,
  className,
}: {
  Icon?: LucideIcon;
  label: string | ReactNode;
  value: string | number | ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-between", className)}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="size-4!" />}
        <span>{label}</span>
      </div>
      <span className="font-medium text-foreground gap-1 flex flex-wrap capitalize">
        {value}
      </span>
    </div>
  );
};
