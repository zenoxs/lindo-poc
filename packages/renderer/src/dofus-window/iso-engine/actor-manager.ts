import { EntityDispositionInformations } from './actor'
import { AlignmentInfos } from './alignment-infos'
import { OccupiedCells } from './map'

export type Bbox = [number, number, number, number]
export interface DisplayActor {
  id: number
  animated: boolean
  animSymbol: unknown
  moving: boolean
  bbox: Bbox
  canMoveDiagonally: boolean
  carriedActor: unknown
  carriedEntity: unknown
  cellId: number
  data: {
    accountId: number
    actorId: number
    name: string
    playerId: number
    alignmentInfos: AlignmentInfos
    humanoidInfo: {
      options: Array<unknown>
      sex: true
      restrictions: {
        cantAggress: boolean
        cantAttack: true
        cantAttackMonster: boolean
        cantBeAggressed: boolean
        cantBeAttackedByMutant: boolean
        cantBeChallenged: boolean
        cantChallenge: boolean
        cantChangeZone: boolean
        cantChat: boolean
        cantExchange: boolean
        cantMinimize: boolean
        cantMove: boolean
        cantRun: boolean
        cantSpeakToNPC: boolean
        cantTrade: boolean
        cantUseInteractive: boolean
        cantUseObject: boolean
        cantUseTaxCollector: boolean
        cantWalk8Directions: boolean
        forceSlowWalk: boolean
        _type: 'ActorRestrictionsInformations'
      }
      _type: 'HumanInformations'
    }
    type: 'GameRolePlayCharacterInformations'
  }
  cancelMovement: (callback: () => void) => void
  isMerchant: () => boolean
  direction: number
  emoteAnimated: boolean
  circleGraphic: unknown
  contextualId: number
  disposition: EntityDispositionInformations
}

export interface ActorManager {
  actors: DisplayActor[]
  getActor: (userId: number) => DisplayActor
  userId: number
  userActor: DisplayActor
  _occupiedCells: OccupiedCells
}
