import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';
// @ts-expect-error ignore
import 'moment/locale/id';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const getInitials = (str?: string | null) => {
  return str
    ? str
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    : '-';
};

export const formatTime = (
  time: string | Date | null | undefined,
  format: string,
  {
    fb = '',
  }: {
    fb?: string;
  } = {}
) => {
  if (!time) return fb;
  return moment(time).format(format);
};

export const fromNow = (
  time: string | Date,
  {
    fb = '',
  }: {
    fb?: string;
  } = {}
) => {
  if (!time) return fb;
  return moment(time).fromNow();
};

export const isURL = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

export const toSlug = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
