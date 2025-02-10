import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
type DateFormatResult = {
  dateTime: string;
  dateDay: string;
  dateOnly: string;
  timeOnly: string;
};

export const formatDateTime = (dateString: Date | string): DateFormatResult => {
  const date = new Date(dateString);

  return {
    dateTime: date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    dateDay: date.toLocaleString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    dateOnly: date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    timeOnly: date.toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}