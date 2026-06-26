import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export const CATEGORIES = [
  "Housing",
  "Jobs",
  "Lawyers / Legal Help",
  "Hospitals / Clinics",
  "Mental Health / Recovery",
  "Banks / Money Transfer",
  "Phone / SIM Cards",
  "Internet Providers",
  "Motorcycle Dealers",
  "Car / Motorcycle Repair",
  "Driving Schools",
  "Language Schools",
  "Churches / Temples",
  "Embassy / Government Offices",
  "Restaurants / Food",
  "Translation Services",
  "Business Setup Help",
] as const;

export const CITIES = ["Vientiane", "Luang Prabang", "Pakse", "Savannakhet"] as const;

export const AFFILIATE_CATEGORIES = [
  "eSIM",
  "VPN",
  "Money Transfer",
  "Travel Insurance",
  "Health Insurance",
  "Language Learning",
  "Resume Builder",
  "Online Courses",
  "Hotels",
  "Flights",
  "Phone Accessories",
] as const;
