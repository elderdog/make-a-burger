import Lettuce from '../../ingredients/Lettuce'
import { type IBurger } from '../Burger'
import IngredientDecorator from './IngredientDecorator'

export default abstract class LettuceDecorator extends IngredientDecorator {
  constructor(burger: IBurger) {
    super(burger)
    this.addIngredients([new Lettuce()])
  }

  public getName(): string {
    return `${this.burger.getName()}, with extra lettuce`
  }
}
