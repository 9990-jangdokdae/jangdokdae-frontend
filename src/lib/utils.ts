import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** 배열에서 item을 토글한다. 있으면 제거, 없으면 추가. */
export function toggleItem<T>(items: T[], item: T): T[] {
  return items.includes(item) ? items.filter((v) => v !== item) : [...items, item];
}
