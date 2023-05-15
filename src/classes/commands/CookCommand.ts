import { type IBurger } from '../burgers/Burger'
import Command from './Command'

export default class CookCommand extends Command {
  private burger: IBurger

  constructor(burger: IBurger) {
    super()
    this.burger = burger
  }

  public execute(): void {
    console.log(this.burger, 'is cooked!')
  }
}
