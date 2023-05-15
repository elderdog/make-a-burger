import type Ingredient from '../../ingredients/Ingredient'
import { type IBurger } from '../Burger'

export default abstract class IngredientDecorator implements IBurger {
  protected burger: IBurger

  constructor(burger: IBurger) {
    this.burger = burger
  }

  public getName(): string {
    return this.burger.getName()
  }

  public getIngredients(): Ingredient[] {
    return this.burger.getIngredients()
  }

  public getPrice(): number {
    return this.burger.getPrice()
  }

  public addIngredients(ingredients: Ingredient[]): void {
    this.burger.addIngredients(ingredients)
  }
}
