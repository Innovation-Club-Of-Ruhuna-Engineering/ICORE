import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFieldColor = (field: string): string => {
  const colors = {
    electrical: 'bg-blue-100 text-blue-800',
    marine: 'bg-purple-100 text-purple-800',
    mechanical: 'bg-green-100 text-green-800',
    civil: 'bg-orange-100 text-orange-800',
    computer: 'bg-teal-100 text-teal-800',
  };
  return colors[field as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};