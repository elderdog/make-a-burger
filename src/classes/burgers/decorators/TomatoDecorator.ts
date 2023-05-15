import Tomato from '../../ingredients/Tomato'
import { type IBurger } from '../Burger'
import IngredientDecorator from './IngredientDecorator'

export default class TomatoDecorator extends IngredientDecorator {
  constructor(burger: IBurger) {
    super(burger)
    this.addIngredients([new Tomato()])
  }

  public getName(): string {
    return `${super.getName()}, with extra tomato`
  }
}
