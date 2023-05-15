import EventBus, { EventType } from '../common/EventBus'
import type { IBurger } from '../burgers/Burger'

export default class BurgerDisplay {
  protected burgers: IBurger[]

  constructor() {
    this.burgers = []
    EventBus.on(EventType.BURGER_COOKED, burger => this.add(burger))
  }

  public add(burger: IBurger): void {
    this.burgers.push(burger)
    EventBus.emit(EventType.DISPLAY_UPDATE, burger)
  }

  public getList(): IBurger[] {
    return this.burgers
  }
}
