import Beef from '../ingredients/Beef'
import Cheese from '../ingredients/Cheese'
import Burger from './Burger'

export default class BeefBurger extends Burger {
  constructor() {
    super('Beef Burger', [new Beef(), new Cheese()])
  }
}
