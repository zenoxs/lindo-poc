import { RootStore } from '@/store'

export abstract class Mod {
  private events: any[] = []
  private onReset: any[] = []

  readonly wGame: any | Window
  protected readonly rootStore: RootStore

  constructor(wGame: Window, rootStore: RootStore) {
    this.wGame = wGame
    this.rootStore = rootStore
  }

  startMod(): void {}

  protected addOnResetListener(fct: any): void {
    this.onReset.push(fct)
  }

  protected getRandomTime(min: number, max: number): number {
    return Math.random() * (max * 1000 - min * 1000) + min * 1000
  }

  protected on(manager: any, eventHandler: string, fct: any): void {
    manager.on(eventHandler, fct)
    this.events.push({
      manager,
      eventHandler,
      fct
    })
  }

  protected once(manager: any, eventHandler: string, fct: any): void {
    manager.once(eventHandler, fct)
    this.events.push({
      manager,
      eventHandler,
      fct
    })
  }

  protected removeListener(manager: any, eventHandler: string, fct: any): void {
    manager.removeListener(eventHandler, fct)
  }

  public reset(): void {
    this.onReset.forEach((fct) => {
      fct()
    })
    this.onReset = []
    this.events.forEach((event) => {
      this.removeListener(event.manager, event.eventHandler, event.fct)
    })
    this.events = []
  }
}
