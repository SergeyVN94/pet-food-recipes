import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getNoun = (count: number, one: string, two: string, five: string) => {
  let n = Math.abs(count);

  n %= 100;

  if (n >= 5 && n <= 20) {
    return five;
  }

  n %= 10;

  if (n === 1) {
    return one;
  }

  if (n >= 2 && n <= 4) {
    return two;
  }

  return five;
};

const periods = [
  { time: 31536000, name: ['год', 'года', 'лет'] },
  { time: 2592000, name: ['месяц', 'месяца', 'месяцев'] },
  { time: 86400, name: ['день', 'дня', 'дней'] },
  { time: 3600, name: ['час', 'часа', 'часов'] },
  { time: 60, name: ['минута', 'минуты', 'минут'] },
  { time: 1, name: ['секунда', 'секунды', 'секунд'] },
];

export const getTimeSince = (date: string) => {
  const diff = dayjs().unix() - dayjs(date).unix();

  for (let i = 0; i < periods.length; i++) {
    const period = periods[i];

    if (diff >= period.time) {
      const rounded = Math.floor(diff / period.time);
      return `${rounded} ${getNoun(rounded, period.name[0], period.name[1], period.name[2])} назад`;
    }
  }
};

export const arrayToDictionary = <T extends Record<string, any>, K extends keyof T, V extends keyof T | undefined = undefined>(
  array: T[],
  key: K,
  keyForValue?: V,
): Record<T[K], V extends keyof T ? T[V] : T> => {
  type Acc = Record<T[K], V extends keyof T ? T[V] : T>;

  return array.reduce<Acc>((acc, item) => {
    // @ts-ignore
    acc[item[key]] = keyForValue ? item[keyForValue] : item;

    return acc;
  }, {} as Acc);
};

export const clampNumber = (value: number, min: number, max: number) => (value < min ? min : value > max ? max : value);

declare global {
  interface Window {
    ym: any;
  }
}

export const yandexMetrica = (type: string, data: unknown) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID), type, data);
  }
};
