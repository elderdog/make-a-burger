import type Command from '../commands/Command'

export default class Kitchen {
  protected commands: Command[]

  constructor() {
    this.commands = []
  }

  public addCommand(command: Command): void {
    this.commands.push(command)
  }

  public execute(): void {
    this.commands.reduce<void>((_, command) => command.execute(), undefined)
    this.commands = []
  }
}
