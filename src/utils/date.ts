export function toDays(beginDate: Date, endDate: Date) {
  return (endDate.getTime() - beginDate.getTime()) / (1000 * 60 * 60 * 24);
}

export function toHours(beginDate: Date, endDate: Date) {
  return (endDate.getTime() - beginDate.getTime()) / (1000 * 60 * 60);
}

export function toMinutes(beginDate: Date, endDate: Date) {
  return (endDate.getTime() - beginDate.getTime()) / (1000 * 60);
}

export function toSeconds(beginDate: Date, endDate: Date) {
  return (endDate.getTime() - beginDate.getTime()) / 1000;
}
