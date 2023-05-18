import { type IBurger } from '../burgers/Burger'
import EventBus, { EventType } from '../common/EventBus'
import logger from '../utils/logger'
import Command from './Command'

export default class CookCommand extends Command {
  private burger: IBurger

  constructor(burger: IBurger) {
    super()
    this.burger = burger
    logger.info('[CookCommand]: created')
  }

  public execute(): void {
    logger.info('[CookCommand]: execute')
    EventBus.emit(EventType.BURGER_COOKING, this.burger)
    this.burger.cook().then(() => {
      logger.info('[CookCommand]: burger cooked')
      EventBus.emit(EventType.BURGER_COOKED, this.burger)
    })
  }
}
