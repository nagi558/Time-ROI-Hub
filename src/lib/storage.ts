const KEY = 'hourlyWage'

export const getHourlyWage = (): number => {
  const stored = localStorage.getItem(KEY)
  const num = Number(stored)
  return Number.isFinite(num) && num > 0 ? num : 1500
}

export const setHourlyWage = (wage: number): void =>
  localStorage.setItem(KEY, String(wage))
