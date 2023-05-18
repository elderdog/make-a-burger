import EventBus, { EventType } from '../common/EventBus'
import type { IBurger } from '../burgers/Burger'

export default class BurgerDisplay {
  public isOnDuty: boolean
  protected burgers: IBurger[]

  constructor() {
    this.isOnDuty = false
    this.burgers = []
  }

  public onDuty(): void {
    this.isOnDuty = true
    EventBus.on(EventType.BURGER_COOKED, this.add)
  }

  public offDuty(): void {
    this.isOnDuty = false
    this.burgers = []
    EventBus.off(EventType.BURGER_COOKED, this.add)
  }

  public add = (burger: IBurger): void => {
    this.checkStatus()
    this.burgers.push(burger)
    EventBus.emit(EventType.DISPLAY_UPDATE, burger)
  }

  public getList(): IBurger[] {
    this.checkStatus()
    return this.burgers
  }

  protected checkStatus(): void {
    if (!this.isOnDuty) throw new Error('Not on duty')
  }
}
