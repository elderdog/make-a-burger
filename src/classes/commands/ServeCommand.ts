import { type IMeal } from '../meals/Meal'
import EventBus, { EventType } from '../common/EventBus'
import Command from './Command'

export default class ServeCommand extends Command {
  private meal: IMeal

  constructor(meal: IMeal) {
    super()
    this.meal = meal
  }

  public execute(): void {
    EventBus.emit(EventType.MEAL_READY, this.meal)
  }
}
