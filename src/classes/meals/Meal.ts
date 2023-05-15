import type { IBurger } from '../burgers/Burger'

export interface IMeal {
  getName(): string
  getPrice(): number
}

export default class Meal implements IMeal {
  protected burger: IBurger

  constructor(burger: IBurger) {
    this.burger = burger
  }

  public getName(): string {
    return this.burger.getName()
  }

  public getPrice(): number {
    return this.burger.getPrice()
  }
}
