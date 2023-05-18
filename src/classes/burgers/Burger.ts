import { v4 as uuid } from 'uuid'
import type Ingredient from '../ingredients/Ingredient'
import logger from '../utils/logger'

export interface IBurger {
  getId(): string
  getName(): string
  getIngredients(): Ingredient[]
  getPrice(): number
  addIngredients(ingredients: Ingredient[]): void
  cook(): Promise<void>
}

export default abstract class Burger implements IBurger {
  protected name: string
  protected ingredients: Ingredient[]
  protected price = 3
  protected id = uuid()

  constructor(name: string, ingredients: Ingredient[]) {
    this.name = name
    this.ingredients = ingredients
    logger.info('[Burger]: created')
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getIngredients(): Ingredient[] {
    return this.ingredients
  }

  public getPrice(): number {
    const ingredientsPrice = this.ingredients.reduce((sum, ingredient) => sum + ingredient.getPrice(), 0)
    return this.price + ingredientsPrice
  }

  public addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients)
  }

  public cook(): Promise<void> {
    logger.info('[Burger]: cooking...')
    return new Promise(resolve => {
      setTimeout(() => {
        logger.info('[Burger]: is cooked')
        resolve()
      }, 3000)
    })
  }
}
