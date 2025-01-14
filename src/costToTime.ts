export const costToTime = (cost: number): string => {
  const minutesAll = cost * 15;
  const hours = Math.floor(minutesAll / 60)
  const mins = minutesAll % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`
}