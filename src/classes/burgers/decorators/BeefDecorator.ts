import Beef from '../../ingredients/Beef'
import { type IBurger } from '../Burger'
import IngredientDecorator from './IngredientDecorator'

export default class BeefDecorator extends IngredientDecorator {
  constructor(burger: IBurger) {
    super(burger)
    super.addIngredients([new Beef()])
  }

  public getName(): string {
    return `${super.getName()}, with extra beef`
  }
}
