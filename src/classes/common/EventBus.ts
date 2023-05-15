import type { IBurger } from '../burgers/Burger'
import type { IMeal } from '../meals/Meal'
import TypedEmitter from './TypedEmitter'

export enum EventType {
  BURGER_COOKING = 'burger-cooking',
  BURGER_COOKED = 'burger-cooked',
  MEAL_READY = 'meal-ready'
}

interface BurgerEvents {
  [EventType.BURGER_COOKING]: IBurger
  [EventType.BURGER_COOKED]: IBurger
}

interface MealEvents {
  [EventType.MEAL_READY]: IMeal
}

class EventBus extends TypedEmitter<BurgerEvents & MealEvents> {
  private static instance: EventBus

  private constructor() {
    super()
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus()
    }

    return EventBus.instance
  }
}

export default EventBus.getInstance()
