import Tomato from '../ingredients/Tomato'
import Lettuce from '../ingredients/Lettuce'
import Burger from './Burger'

export default class VeggieBurger extends Burger {
  constructor() {
    super('Cheese Burger', [new Tomato(), new Lettuce()])
  }
}
