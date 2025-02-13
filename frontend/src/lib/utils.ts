import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const url = "http://localhost:8080"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const queryAPI = async (method: string, path: string) => {
  const header = new Headers({ 'Content-Type': 'application/json' });

  const res = await fetch(`${url}${path}`, {
    method,
    headers: header
  });

  return res.json();
}