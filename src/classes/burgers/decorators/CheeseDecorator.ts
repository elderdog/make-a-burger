import Cheese from '../../ingredients/Cheese'
import { type IBurger } from '../Burger'
import IngredientDecorator from './IngredientDecorator'

export default class CheeseDecorator extends IngredientDecorator {
  constructor(burger: IBurger) {
    super(burger)
    super.addIngredients([new Cheese()])
  }

  public getName(): string {
    return `${super.getName()}, with extra cheese`
  }
}
