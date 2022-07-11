import TypedEmitter from 'typed-emitter'
import { CharacterStats } from './character-stats'
import { Spell } from './spell'

export type PlayerDataEvents = {
  characterSelectedSuccess: () => void
}

export interface JobSkill {
  info: {
    id: number
    nameId: string
    parentJob: number
    availableInHouse: boolean
    craftableItemIds: Array<number>
    cursor: number
    gatheredRessourceItem: number
    interactiveId: number
    isForgemagus: boolean
    isRepair: boolean
    recipes: Array<unknown>
  }
  maxSlots: number
  probability: number
  _type: string
}

export interface Job {
  id: number
  description: {
    jobId: number
    skills: Array<JobSkill>
    _type: string
  }
  experience?: {
    jobId: number
    jobLevel: number
    jobXP: number
    jobXpLevelFloor: number
    jobXpNextLevelFloor: number
    _type: string
  }
  info: {
    iconId: number
    id: number
    nameId: string
    specializationOfId: number
    toolIds: Array<number>
  }
}

export interface PlayerData extends TypedEmitter<PlayerDataEvents> {
  id: number
  inventory: {
    maxWeight: number
    weight: number
  }
  partyData: {}
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
  jobs: {
    jobXpBonus: number
    list: Record<string, Job>
  }
  characterBaseInformations: {
    id: number
    name: string
    entityLook: unknown
  }
}
