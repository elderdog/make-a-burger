import Tomato from '../ingredients/Tomato'
import Lettuce from '../ingredients/Lettuce'
import Cheese from '../ingredients/Cheese'
import Burger from './Burger'

export default class CheeseBurger extends Burger {
  constructor() {
    super('Cheese Burger', [new Tomato(), new Lettuce(), new Cheese()])
  }
}
