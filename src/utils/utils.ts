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

const siUnits = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const defaultUnits = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
const siUnitsBytes = siUnits.map((_, index) => 1000 ** (index + 1));
const defaultUnitsBytes = defaultUnits.map((_, index) => 1024 ** (index + 1));
/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param fractionDigits Number of decimal places to display.
 *
 * @return Formatted string.
 */
export const humanFileSize = (bytes: number, si = false, fractionDigits = 1) => {
  const thresh = si ? 1000 : 1024;
  const normalizedBytes = Math.abs(bytes);

  if (normalizedBytes < thresh) {
    return `${normalizedBytes} B`;
  }

  const unitsBytes = si ? siUnitsBytes : defaultUnitsBytes;

  let index = unitsBytes.findIndex(bytesInUnit => normalizedBytes < bytesInUnit) - 1;

  console.log(normalizedBytes, index);

  if (index < 0) {
    index = unitsBytes.length - 1;
  }

  const unitsResult = normalizedBytes / unitsBytes[index];
  const isAbs = normalizedBytes % unitsBytes[index] === 0;
  const units = si ? siUnits : defaultUnits;

  return `${isAbs ? unitsResult : unitsResult.toFixed(fractionDigits)} ${units[index]}`;
};

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
