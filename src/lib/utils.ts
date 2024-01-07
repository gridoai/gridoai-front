import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function asyncMap<T, U>(
  arr: T[],
  func: (item: T) => Promise<U>
): Promise<U[]> {
  const results: U[] = [];

  for (const item of arr) {
    await func(item).then(results.push).catch(console.error);
  }

  return results;
}
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
