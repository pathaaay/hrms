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
  const slots: {
    formattedTime: string;
    startMinutes: number;
    endMinutes: number;
  }[] = [];

  let currentMinutes = startTime * 60;
  const endMinutes = endTime * 60;
  while (currentMinutes < endMinutes) {
    const formattedTime = formatMinutesToHours(currentMinutes);
    slots.push({
      formattedTime,
      startMinutes: currentMinutes,
      endMinutes: currentMinutes + duration,
    });
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

export const formatMinutesToHours = (value: number) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
