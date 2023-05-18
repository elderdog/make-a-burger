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
import BeefDecorator from '../burgers/decorators/BeefDecorator'
import CheeseDecorator from '../burgers/decorators/CheeseDecorator'
import LettuceDecorator from '../burgers/decorators/LettuceDecorator'
import TomatoDecorator from '../burgers/decorators/TomatoDecorator'

enum BurgerType {
  BEEF = 'Beef Burger',
  CHEESE = 'Cheese Burger',
  VEGGIE = 'Veggie Burger'
}

const IngredientDecoratorMap = {
  beef: BeefDecorator,
  cheese: CheeseDecorator,
  lettuce: LettuceDecorator,
  tomato: TomatoDecorator
}

type IngredientType = keyof typeof IngredientDecoratorMap

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
  }

  public onDuty(): void {
    this.isOnDuty = true
    EventBus.on(EventType.DISPLAY_UPDATE, this.serve)
  }

  public offDuty(): void {
    this.isOnDuty = false
    this.orders = []
    EventBus.off(EventType.DISPLAY_UPDATE, this.serve)
  }

  public takeOrder(burgerType: BurgerType, dineIn: boolean, extras: IngredientType[]): void {
    const burger = BurgerFactory.createBurger(burgerType)
    const decoratedBurger = extras.reduce<IBurger>((burger, extra) => this.decorateBurger(burger, extra), burger)
    this.orders.push({ meal: new Meal(decoratedBurger), dineIn })
    const cookCommand = new CookCommand(decoratedBurger)
    this.kitchen.addCommand(cookCommand)
    this.kitchen.cook()
  }

  private decorateBurger(burger: IBurger, extra: IngredientType): IBurger {
    const Decorator = IngredientDecoratorMap[extra]
    return new Decorator(burger)
  }

  public serve = (burger: IBurger): void | IMeal => {
    const idx = this.orders.findIndex(order => order.meal.getId() === burger.getId())
    if (idx === -1) return
    const order = this.orders[idx]
    // meal is served, remove it from the list
    this.orders.splice(idx, 1)
    if (order.dineIn) {
      return new MealToDineInAdapter(order.meal)
    } else {
      return new MealToTakeOutAdapter(order.meal, 3)
    }
  }
}
