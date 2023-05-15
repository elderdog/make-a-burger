export interface IIngredient {
  getName(): string
  getPrice(): number
}

export default abstract class Ingredient implements IIngredient {
  protected name: string
  protected price: number

  public constructor(name: string, price: number) {
    this.name = name
    this.price = price
  }

  public getName(): string {
    return this.name
  }

  public getPrice(): number {
    return this.price
  }
}
