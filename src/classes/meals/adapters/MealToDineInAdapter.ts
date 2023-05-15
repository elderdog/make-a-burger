import type { IMeal } from '../Meal'
import type Meal from '../Meal'

export interface IDineInMeal extends IMeal {
  getTableware(): string
}

export default class MealToDineInAdapter implements IDineInMeal {
  protected meal: Meal

  constructor(meal: Meal) {
    this.meal = meal
  }

  public getName(): string {
    return `Dine in: ${this.meal.getName()}`
  }

  public getPrice(): number {
    return this.meal.getPrice()
  }

  public getTableware(): string {
    return 'plate, knife, fork'
  }
}
