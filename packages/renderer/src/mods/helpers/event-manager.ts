import TypedEmitter, { EventMap } from 'typed-emitter'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IEvent<Events extends EventMap, E extends keyof Events = any> {
  event: E
  listener: Events[E]
}

export class EventManager<Events extends EventMap> {
  private _events: Array<IEvent<Events>> = []
  private _emitter: TypedEmitter<Events>

  constructor(emitter: TypedEmitter<Events>) {
    this._emitter = emitter
  }

  once<E extends keyof Events>(event: E, listener: Events[E]) {
    // TODO: Maybe add an other once to remove the event form the events list
    this._emitter.once(event, listener)
    this._events.push({
      event,
      listener
    })
  }

  on<E extends keyof Events>(event: E, listener: Events[E]) {
    this._emitter.on(event, listener)
    this._events.push({
      event,
      listener
    })
  }

  removeListener<E extends keyof Events>(event: E, listener: Events[E]) {
    this._emitter.removeListener(event, listener)
    this._events = this._events.filter((event) => event.event !== event && event.listener !== listener)
  }

  close() {
    for (const event of this._events) {
      this.removeListener(event.event, event.listener)
    }
  }
}
