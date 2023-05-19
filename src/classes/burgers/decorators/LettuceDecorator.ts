import Lettuce from '../../ingredients/Lettuce'
import { type IBurger } from '../Burger'
import IngredientDecorator from './IngredientDecorator'

export default class LettuceDecorator extends IngredientDecorator {
  constructor(burger: IBurger) {
    super(burger)
    super.addIngredients([new Lettuce()])
  }

  public getName(): string {
    return `${super.getName()}, with extra lettuce`
  }
}
