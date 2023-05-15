import Kitchen from '../kitchens/Kitchen'
import BurgerRegistry from '../registries/BurgerRegistry'
import BurgerFactory from '../burgers/BurgerFactory'
import BeefBurger from '../burgers/BeefBurger'
import CheeseBurger from '../burgers/CheeseBurger'
import VeggieBurger from '../burgers/VeggieBurger'
import CookCommand from '../commands/CookCommand'
import EventBus, { EventType } from '../common/EventBus'
import Meal, { type IMeal } from '../meals/Meal'
import MealToDineInAdapter from '../meals/adapters/MealToDineInAdapter'
import MealToTakeOutAdapter from '../meals/adapters/MealToTakeOutAdapter'
import type { IBurger } from '../burgers/Burger'

enum BurgerType {
  BEEF = 'Beef Burger',
  CHEESE = 'Cheese Burger',
  VEGGIE = 'Veggie Burger'
}

export default class Waiter {
  public isOnDuty: boolean
  public kitchen: Kitchen
  public orders: { meal: Meal; dineIn: boolean }[]

  constructor() {
    this.isOnDuty = false
    this.kitchen = new Kitchen()
    this.orders = []
    BurgerRegistry.register(BurgerType.BEEF, BeefBurger)
    BurgerRegistry.register(BurgerType.CHEESE, CheeseBurger)
    BurgerRegistry.register(BurgerType.VEGGIE, VeggieBurger)
    EventBus.on(EventType.DISPLAY_UPDATE, burger => this.serve(burger))
  }

  public onDuty(): void {
    this.isOnDuty = true
    console.log('Waiter is on duty')
  }

  public offDuty(): void {
    this.isOnDuty = false
    // TODO: release object reference
  }

  public takeOrder(burgerType: BurgerType, dineIn: boolean): void {
    const burger = BurgerFactory.createBurger(burgerType)
    this.orders.push({ meal: new Meal(burger), dineIn })
    const cookCommand = new CookCommand(burger)
    this.kitchen.addCommand(cookCommand)
    this.kitchen.cook()
  }

  public serve(burger: IBurger): void | IMeal {
    const order = this.orders.find(order => order.meal.getId() === burger.getId())
    if (!order) return
    if (order.dineIn) {
      return new MealToDineInAdapter(order.meal)
    } else {
      return new MealToTakeOutAdapter(order.meal, 3)
    }
  }
}
