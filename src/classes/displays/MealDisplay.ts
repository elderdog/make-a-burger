import type { IMeal } from '../meals/Meal'

export default class BurgerDisplay {
  protected meals: IMeal[]

  constructor() {
    this.meals = []
  }

  public add(meal: IMeal): void {
    this.meals.push(meal)
  }

  public getList(): IMeal[] {
    return this.meals
  }
}
