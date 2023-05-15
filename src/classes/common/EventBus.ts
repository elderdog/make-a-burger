import type { IBurger } from '../burgers/Burger'
import type { IMeal } from '../meals/Meal'
import TypedEmitter from './TypedEmitter'

interface BurgerEvents {
  'burger-cooking': IBurger
  'burger-cooked': IBurger
}

interface MealEvents {
  'meal-ready': IMeal
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
