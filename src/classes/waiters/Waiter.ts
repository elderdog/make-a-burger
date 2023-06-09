import Kitchen from '../kitchens/Kitchen'
import BurgerRegistry from '../registries/BurgerRegistry'
import BurgerFactory from '../burgers/BurgerFactory'
import BeefBurger from '../burgers/BeefBurger'
import CheeseBurger from '../burgers/CheeseBurger'
import VeggieBurger from '../burgers/VeggieBurger'
import CookCommand from '../commands/CookCommand'
import EventBus, { EventType } from '../common/EventBus'
import TypedEmitter from '../common/TypedEmitter'
import Meal, { type IMeal } from '../meals/Meal'
import MealToDineInAdapter from '../meals/adapters/MealToDineInAdapter'
import MealToTakeOutAdapter from '../meals/adapters/MealToTakeOutAdapter'
import type { IBurger } from '../burgers/Burger'
import BeefDecorator from '../burgers/decorators/BeefDecorator'
import CheeseDecorator from '../burgers/decorators/CheeseDecorator'
import LettuceDecorator from '../burgers/decorators/LettuceDecorator'
import TomatoDecorator from '../burgers/decorators/TomatoDecorator'
import logger from '../utils/logger'

/**
 * TODO:
 * extract burger type related code to another file
 * for decoupling purpose, waiter class file does not need to know burger type detail
 * while more burger types being added, waiter class file should not be bothered
 */

export enum BurgerType {
  BEEF = 'Beef Burger',
  CHEESE = 'Cheese Burger',
  VEGGIE = 'Veggie Burger'
}

interface MealEvents {
  'meal-ready': IMeal
}

const IngredientDecoratorMap = {
  beef: BeefDecorator,
  cheese: CheeseDecorator,
  lettuce: LettuceDecorator,
  tomato: TomatoDecorator
}

type IngredientType = keyof typeof IngredientDecoratorMap

export default class Waiter extends TypedEmitter<MealEvents> {
  public isOnDuty: boolean
  public kitchen: Kitchen
  public orders: { meal: Meal; dineIn: boolean }[]

  constructor() {
    super()
    this.isOnDuty = false
    this.kitchen = new Kitchen()
    this.orders = []
    BurgerRegistry.register(BurgerType.BEEF, BeefBurger)
    BurgerRegistry.register(BurgerType.CHEESE, CheeseBurger)
    BurgerRegistry.register(BurgerType.VEGGIE, VeggieBurger)
    logger.info('[Waiter]: created')
  }

  public onDuty(): void {
    if (this.isOnDuty) {
      logger.info('[Waiter]: is already on duty')
      return
    }
    logger.info('[Waiter]: is on duty')
    this.isOnDuty = true
    EventBus.on(EventType.DISPLAY_UPDATE, this.serve)
  }

  public offDuty(): void {
    if (!this.isOnDuty) {
      logger.info('[Waiter]: is already off duty')
      return
    }
    logger.info('[Waiter]: is off duty')
    this.isOnDuty = false
    this.orders = []
    EventBus.off(EventType.DISPLAY_UPDATE, this.serve)
  }

  public takeOrder(burgerType: BurgerType, dineIn: boolean, extras: IngredientType[]): void {
    logger.info('[Waiter]: take order')
    this.checkStatus()
    const burger = BurgerFactory.createBurger(burgerType)
    const decoratedBurger = extras.reduce<IBurger>((burger, extra) => this.decorateBurger(burger, extra), burger)
    this.orders.push({ meal: new Meal(decoratedBurger), dineIn })
    const cookCommand = new CookCommand(decoratedBurger)
    this.kitchen.addCommand(cookCommand)
    this.kitchen.cook()
  }

  private decorateBurger(burger: IBurger, extra: IngredientType): IBurger {
    logger.info(`[Waiter]: add extra ${extra}`)
    const Decorator = IngredientDecoratorMap[extra]
    return new Decorator(burger)
  }

  public serve = (burger: IBurger): void => {
    logger.info('[Waiter]: serve order')
    this.checkStatus()
    const idx = this.orders.findIndex(order => order.meal.getId() === burger.getId())
    if (idx === -1) return
    const order = this.orders[idx]
    // meal is served, remove it from the list
    this.orders.splice(idx, 1)
    let meal: IMeal
    if (order.dineIn) {
      meal = new MealToDineInAdapter(order.meal)
    } else {
      meal = new MealToTakeOutAdapter(order.meal, 3)
    }
    this.emit('meal-ready', meal)
  }

  protected checkStatus(): void {
    if (!this.isOnDuty) throw new Error('Not on duty')
  }
}
