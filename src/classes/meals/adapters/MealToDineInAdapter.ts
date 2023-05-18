import type { IMeal } from '../Meal'
import type Meal from '../Meal'
import logger from '../../utils/logger'

export interface IDineInMeal extends IMeal {
  getTableware(): string
}

export default class MealToDineInAdapter implements IDineInMeal {
  protected meal: Meal

  constructor(meal: Meal) {
    this.meal = meal
    logger.info('[MealToDineInAdapter]: created, prepare tableware')
  }

  public getId(): string {
    return this.meal.getId()
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
