import type Burger from '../burgers/Burger'
import Registry from './Registry'

type BurgerConstructor = new (...args: any[]) => Burger

class BurgerRegistry extends Registry<BurgerConstructor> {
  private static instance: BurgerRegistry

  private constructor() {
    super()
  }

  static getInstance(): BurgerRegistry {
    if (!BurgerRegistry.instance) {
      BurgerRegistry.instance = new BurgerRegistry()
    }

    return BurgerRegistry.instance
  }
}

export default BurgerRegistry.getInstance()
