import { EntityDispositionInformations } from '@/dofus-window/iso-engine/actor'
import TypedEmitter from 'typed-emitter'
import { CharacterStats } from '../character-stats'
import { SpellBuff } from '../spell'

export interface Fighter {
  id: number
  isCreature: boolean
  buffs: Array<SpellBuff>
  level: number
  data: {
    teamId: number
    alive: boolean
    disposition: EntityDispositionInformations
    stats: CharacterStats
  }
}

export type FightManagerEvents = {
  fightEnd: () => void
}

export interface FightManager extends TypedEmitter<FightManagerEvents> {
  fightState: number
  isInBattle: () => boolean
  finishTurn: () => void
  getFighters: () => Array<number>
  isFighterOnUsersTeam: (fighterId: number) => boolean
  getFighter: (actorId: number) => Fighter
}
