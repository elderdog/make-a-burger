export default class Registry<T> {
  private registry: Map<string, T> = new Map()

  public register(name: string, value: T): void {
    this.registry.set(name, value)
  }

  public get(name: string): T | undefined {
    return this.registry.get(name)
  }

  public getRegistry(): Map<string, T> {
    return this.registry
  }
}
