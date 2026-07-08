import { describe, it, expect } from 'vitest'
import { calcROI } from './roi'

describe('calcROI', () => {
  it('通常ケース：便益と回収期間が正しく計算される', () => {
    const result = calcROI({
      price: 59800,
      timeSavedPerDay: 40,
      hourlyWage: 1500,
    })

    expect(result.dailyBenefit).toBeCloseTo(1000, 0)
    expect(result.monthlyBenefit).toBeCloseTo(30000, 0)
    expect(result.paybackMonths).toBeCloseTo(1.99, 1)
  })

  it('境界値：paybackMonths がちょうど3か月になる', () => {
    const result = calcROI({
      price: 90000,
      timeSavedPerDay: 40,
      hourlyWage: 1500,
    })

    expect(result.paybackMonths).toBeCloseTo(3.0, 5)
  })

  it('境界値：paybackMonths がちょうど6か月になる', () => {
    const result = calcROI({
      price: 180000,
      timeSavedPerDay: 40,
      hourlyWage: 1500,
    })

    expect(result.paybackMonths).toBeCloseTo(6.0, 5)
  })

  it('異常値：timeSavedPerDay = 0 の場合は回収期間が Infinity になる', () => {
    const result = calcROI({
      price: 59800,
      timeSavedPerDay: 0,
      hourlyWage: 1500,
    })

    expect(result.paybackMonths).toBe(Infinity)
  })

  it('異常値：hourlyWage = 0 の場合は回収期間が Infinity になる', () => {
    const result = calcROI({
      price: 59800,
      timeSavedPerDay: 40,
      hourlyWage: 0,
    })

    expect(result.paybackMonths).toBe(Infinity)
  })
})