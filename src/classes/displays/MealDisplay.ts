import EventBus, { EventType } from '../common/EventBus'
import type { IMeal } from '../meals/Meal'

export default class BurgerDisplay {
  protected meals: IMeal[]

  constructor() {
    this.meals = []
    EventBus.on(EventType.MEAL_READY, meal => this.add(meal))
  }

  public add(meal: IMeal): void {
    this.meals.push(meal)
    EventBus.emit(EventType.DISPLAY_UPDATE, meal)
  }

  public getList(): IMeal[] {
    return this.meals
  }
}
