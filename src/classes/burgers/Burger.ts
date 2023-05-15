import type Ingredient from '../ingredients/Ingredient'

export interface IBurger {
  getName(): string
  getIngredients(): Ingredient[]
  getPrice(): number
  addIngredients(ingredients: Ingredient[]): void
}

export default abstract class Burger implements IBurger {
  protected name: string
  protected ingredients: Ingredient[]
  protected price = 3

  constructor(name: string, ingredients: Ingredient[]) {
    this.name = name
    this.ingredients = ingredients
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
}
