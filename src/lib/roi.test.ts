import { describe, it, expect } from 'vitest'
import { calcROI } from './roi'

describe('calcROI', () => {
  it('通常ケース：洗濯機の回収期間・verdictが正しい', () => {
    const result = calcROI({
      price: 59800,
      timeSavedPerDay: 40,
      hourlyWage: 1500,
    })
    expect(result.dailyBenefit).toBeCloseTo(1000, 0)
    expect(result.monthlyBenefit).toBeCloseTo(30000, 0)
    expect(result.paybackMonths).toBeCloseTo(1.99, 1)
    expect(result.verdictScore).toBe(100)
    expect(result.verdict).toBe('buy')
  })

  it('境界値：paybackMonths ちょうど3 ➡︎ score 100', () => {
    const result = calcROI({
      price: 90000,
      timeSavedPerDay: 40,
      hourlyWage: 1500,
    })
    expect(result.paybackMonths).toBeCloseTo(3.0, 5)
    expect(result.verdictScore).toBe(100)
  })

  it('境界値：paybackMonths 3超 → score 70', () => {
    const result = calcROI({
      price: 90100,
      timeSavedPerDay: 40,
      hourlyWage: 1500,
    })
    expect(result.verdictScore).toBe(70)
    expect(result.verdict).toBe('good')
  })

  it('境界値：paybackMonths ちょうど6 → score 70', () => {
    const result = calcROI({
      price: 180000,
      timeSavedPerDay: 40,
      hourlyWage: 1500,
    })
    expect(result.paybackMonths).toBeCloseTo(6.0, 5)
    expect(result.verdictScore).toBe(70)
  })

  it('境界値：paybackMonths 6超 → score 40', () => {
    const result = calcROI({
      price: 180100,
      timeSavedPerDay: 40,
      hourlyWage: 1500,
    })
    expect(result.verdictScore).toBe(40)
    expect(result.verdict).toBe('maybe')
  })

  it('境界値：paybackMonths 12超 → score 10', () => {
    const result = calcROI({
      price: 500000,
      timeSavedPerDay: 40,
      hourlyWage: 1500,
    })
    expect(result.verdictScore).toBe(10)
    expect(result.verdict).toBe('pass')
  })

  it('異常値：timeSavedPerDay = 0 → Infinity', () => {
    const result = calcROI({
      price: 59800,
      timeSavedPerDay: 0,
      hourlyWage: 1500,
    })
    expect(result.paybackMonths).toBe(Infinity)
    expect(result.verdictScore).toBe(10)
    expect(result.verdict).toBe('pass')
  })

  it('異常値：hourlyWage = 0 → Infinity', () => {
    const result = calcROI({ price: 59800, timeSavedPerDay: 40, hourlyWage: 0 })
    expect(result.paybackMonths).toBe(Infinity)
    expect(result.verdictScore).toBe(10)
    expect(result.verdict).toBe('pass')
  })
})
