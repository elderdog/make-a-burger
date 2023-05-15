import Beef from '../../ingredients/Beef'
import { type IBurger } from '../Burger'
import IngredientDecorator from './IngredientDecorator'

export default abstract class BeefDecorator extends IngredientDecorator {
  constructor(burger: IBurger) {
    super(burger)
    this.addIngredients([new Beef()])
  }

  public getName(): string {
    return `${super.getName()}, with extra beef`
  }
}
