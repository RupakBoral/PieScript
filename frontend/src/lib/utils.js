import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const backendUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_DEV_URL
    : import.meta.env.VITE_BACKEND_PROD_URL;
