import EventBus, { EventType } from '../common/EventBus'
import type { IBurger } from '../burgers/Burger'
import logger from '../utils/logger'

export default class BurgerDisplay {
  public isOnDuty: boolean
  protected burgers: IBurger[]

  constructor() {
    this.isOnDuty = false
    this.burgers = []
    logger.info('[BurgerDisplay]: created')
  }

  public onDuty(): void {
    if (this.isOnDuty) {
      logger.info('[BurgerDisplay]: is already on duty')
      return
    }
    logger.info('[BurgerDisplay]: is on duty')
    this.isOnDuty = true
    EventBus.on(EventType.BURGER_COOKED, this.add)
  }

  public offDuty(): void {
    if (!this.isOnDuty) {
      logger.info('[BurgerDisplay]: is already off duty')
      return
    }
    logger.info('[BurgerDisplay]: is off duty')
    this.isOnDuty = false
    this.burgers = []
    EventBus.off(EventType.BURGER_COOKED, this.add)
  }

  public add = (burger: IBurger): void => {
    logger.info(`[BurgerDisplay]: display burger: ${burger.getName()}`)
    this.checkStatus()
    this.burgers.push(burger)
    EventBus.emit(EventType.DISPLAY_UPDATE, burger)
  }

  public getList(): IBurger[] {
    logger.info('[BurgerDisplay]: getList')
    this.checkStatus()
    return this.burgers
  }

  protected checkStatus(): void {
    if (!this.isOnDuty) throw new Error('Not on duty')
  }
}
