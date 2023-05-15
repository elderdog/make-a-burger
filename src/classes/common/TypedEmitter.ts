import { EventEmitter } from 'node:events'

export type EventMap = Record<string, any>
export type EventKey<T extends EventMap> = string & keyof T
export type EventReceiver<T> = (params: T) => void

interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void
}

export default class TypedEmitter<T extends EventMap> implements Emitter<T> {
  private emitter = new EventEmitter()

  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    this.emitter.on(eventName, fn)
  }

  once<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    this.emitter.once(eventName, fn)
  }

  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    this.emitter.off(eventName, fn)
  }

  emit<K extends EventKey<T>>(eventName: K, params: T[K]): boolean {
    return this.emitter.emit(eventName, params)
  }
}
