import { type IBurger } from '../burgers/Burger'
import EventBus, { EventType } from '../common/EventBus'
import Command from './Command'

export default class CookCommand extends Command {
  private burger: IBurger

  constructor(burger: IBurger) {
    super()
    this.burger = burger
  }

  public execute(): void {
    EventBus.emit(EventType.BURGER_COOKING, this.burger)
    this.burger.cook().then(() => {
      EventBus.emit(EventType.BURGER_COOKED, this.burger)
    })
  }
}
