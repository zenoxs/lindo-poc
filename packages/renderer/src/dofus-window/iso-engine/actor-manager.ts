import { Actor } from './actor'
import { OccupiedCells } from './map'

export interface ActorManager {
  actors: Actor[]
  getActor: (userId: number) => Actor
  userId: number
  userActor: Actor
  _occupiedCells: OccupiedCells
}
