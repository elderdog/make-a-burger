import type { IMeal } from '../Meal'
import type Meal from '../Meal'

export interface ITakeOutMeal extends IMeal {
  getWrapping(): string
}

export default class MealToTakeOutAdapter implements ITakeOutMeal {
  protected meal: Meal
  protected deliveryFee: number

  constructor(meal: Meal, deliveryFee: number) {
    this.meal = meal
    this.deliveryFee = deliveryFee
  }

  public getName(): string {
    return `Take out: ${this.meal.getName()}`
  }

  public getPrice(): number {
    return this.meal.getPrice() + this.deliveryFee
  }

  public getWrapping(): string {
    return 'wrapping bag, box, gloves'
  }
}
