import BurgerRegistry from '../registries/BurgerRegistry'
import type Burger from './Burger'

export default class BurgerFactory {
  static createBurger(name: string): Burger {
    const BurgerConstructor = BurgerRegistry.get(name)
    if (!BurgerConstructor) throw new Error(`Cannot create ${name} Burger`)
    return new BurgerConstructor()
  }
}
