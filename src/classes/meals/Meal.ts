import type { IBurger } from '../burgers/Burger'

export interface IMeal {
  getId(): string
  getName(): string
  getPrice(): number
}

export default class Meal implements IMeal {
  protected burger: IBurger

  constructor(burger: IBurger) {
    this.burger = burger
  }

  public getId(): string {
    return this.burger.getId()
  }

  public getName(): string {
    return this.burger.getName()
  }

  public getPrice(): number {
    return this.burger.getPrice()
  }
}
