import type { IBurger } from '../burgers/Burger'
import type { IMeal } from '../meals/Meal'
import TypedEmitter from './TypedEmitter'

export enum EventType {
  BURGER_COOKING = 'burger-cooking',
  BURGER_COOKED = 'burger-cooked',
  MEAL_READY = 'meal-ready',
  DISPLAY_UPDATE = 'display-update'
}

interface BurgerEvents {
  [EventType.BURGER_COOKING]: IBurger
  [EventType.BURGER_COOKED]: IBurger
}

interface MealEvents {
  [EventType.MEAL_READY]: IMeal
}

interface DisplayEvents {
  [EventType.DISPLAY_UPDATE]: IMeal
}

type Events = BurgerEvents & MealEvents & DisplayEvents

class EventBus extends TypedEmitter<Events> {
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
