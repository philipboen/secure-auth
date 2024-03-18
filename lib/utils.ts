import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  const fullname = name.split(" ")
  const first = fullname[0]
  const last = fullname[fullname.length - 1]
  return `${first[0]}${last ? last[0] : ""}`
}