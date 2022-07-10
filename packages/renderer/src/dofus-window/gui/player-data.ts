import TypedEmitter from 'typed-emitter'
import { CharacterStats } from './character-stats'
import { Spell } from './spell'

export type PlayerDataEvents = {
  characterSelectedSuccess: () => void
}

export interface PlayerData extends TypedEmitter<PlayerDataEvents> {
  id: number
  inventory: {
    maxWeight: number
    weight: number
  }
  characters: {
    mainCharacterId: number
    mainCharacter: {
      spellData: {
        spells: Record<number, Spell>
      }
      characteristics: Record<
        keyof CharacterStats,
        {
          getTotalStat: () => number
        }
      >
    }
  }
}
