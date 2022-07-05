import TypedEmitter, { EventMap } from 'typed-emitter'

export class EventManager {
  private _disposers: Array<Function> = []

  on<Events extends EventMap, E extends keyof Events>(emitter: TypedEmitter<Events>, event: E, listener: Events[E]) {
    emitter.on(event, listener)
    this._disposers.push(() => emitter.removeListener(event, listener))
  }

  close() {
    for (const disposer of this._disposers) {
      disposer()
    }
  }
}
