import type Command from '../commands/Command'
import logger from '../utils/logger'

export default class Kitchen {
  protected commands: Command[]

  constructor() {
    this.commands = []
    logger.info('[Kitchen]: created')
  }

  public addCommand(command: Command): void {
    this.commands.push(command)
  }

  public cook(): void {
    logger.info('[Kitchen]: start to cook')
    this.commands.reduce<void>((_, command) => command.execute(), undefined)
    this.commands = []
  }
}
