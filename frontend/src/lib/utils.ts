import type { MultiSelectOption } from "@/components/common/multi-select";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlots = ({
  startTime,
  endTime,
  duration,
}: {
  startTime: number;
  endTime: number;
  duration: number;
}) => {
  const slots: string[] = [];

  let currentMinutes = startTime * 60;
  const endMinutes = endTime * 60;
  while (currentMinutes < endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    slots.push(formattedTime);
    currentMinutes += duration;
  }
  return slots;
};

export const createMultiSelectOption = (
  value: string,
  label: string,
  options?: Partial<MultiSelectOption>,
): MultiSelectOption => ({
  value,
  label,
  ...options,
});
