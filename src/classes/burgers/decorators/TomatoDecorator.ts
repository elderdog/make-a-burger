import Tomato from '../../ingredients/Tomato'
import { type IBurger } from '../Burger'
import IngredientDecorator from './IngredientDecorator'

export default abstract class TomatoDecorator extends IngredientDecorator {
  constructor(burger: IBurger) {
    super(burger)
    this.addIngredients([new Tomato()])
  }

  public getName(): string {
    return `${this.burger.getName()}, with extra tomato`
  }
}