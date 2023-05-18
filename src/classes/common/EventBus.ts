import type { IBurger } from '../burgers/Burger'
import TypedEmitter from './TypedEmitter'

export enum EventType {
  BURGER_COOKING = 'burger-cooking',
  BURGER_COOKED = 'burger-cooked',
  DISPLAY_UPDATE = 'display-update'
}

interface BurgerEvents {
  [EventType.BURGER_COOKING]: IBurger
  [EventType.BURGER_COOKED]: IBurger
}

interface DisplayEvents {
  [EventType.DISPLAY_UPDATE]: IBurger
}

type Events = BurgerEvents & DisplayEvents

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
