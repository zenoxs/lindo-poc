import { AlignmentInfos } from './alignment-infos'

export interface EntityLook {
  bonesId: number
  speed: number
  _type: 'EntityLook'
}

export interface EntityDispositionInformations {
  cellId: number
  direction: number
  _type: 'EntityDispositionInformations'
}

export interface MonsterStaticInfos {
  isBoss: boolean
  isMiniBoss: boolean
  level: number
  nameId: string
  xp: number
}

export interface MonsterInGroupLightInformations {
  creatureGenericId: number
  grade: number
  level: number
  staticInfos: MonsterStaticInfos
  xp: number
  _type: 'MonsterInGroupLightInformations'
}

export interface MonsterInGroupInformations {
  creatureGenericId: 489
  grade: 5
  level: 24
  look: EntityLook
  staticInfos: MonsterStaticInfos
  xp: 3400
  _type: 'MonsterInGroupInformations'
}

export interface MonsterInGroupAlternativeInformations {
  playerCount: number
  monsters: Array<MonsterInGroupInformations>
  _type: unknown
}

export interface GroupMonsterStaticInformations {
  mainCreatureLightInfos: MonsterInGroupLightInformations
  underlings: Array<MonsterInGroupInformations>
  alternatives?: Array<MonsterInGroupAlternativeInformations>
  _type: 'GroupMonsterStaticInformations'
}

export interface ActorSchema {
  contextualId: number
  disposition: EntityDispositionInformations
  look: EntityLook
  _type:
    | 'GameRolePlayNpcInformations'
    | 'GameRolePlayGroupMonsterInformations'
    | 'GameRolePlayCharacterInformations'
    | 'GameRolePlayMerchantInformations'
}

export interface GameRolePlayNpcInformations extends ActorSchema {
  npcId: number
  sex: false
  specialArtworkId: number
  _npcData: {
    id: number
    gender: number
    nameId: string
    _type: 'Npc'
  }
  _type: 'GameRolePlayNpcInformations'
}

export interface GameRolePlayMerchantInformations extends ActorSchema {
  _type: 'GameRolePlayMerchantInformations'
}

export interface GameRolePlayCharacterInformations extends ActorSchema {
  accountId: number
  name: string
  alignmentInfos: AlignmentInfos
  _type: 'GameRolePlayCharacterInformations'
}

export interface GameRolePlayGroupMonsterInformations extends ActorSchema {
  ageBonus: number
  alignmentSide: number
  hasHardcoreDrop: boolean
  keyRingBonus: boolean
  lootShare: number
  scaleLevel: number
  staticInfos: GroupMonsterStaticInformations
  _type: 'GameRolePlayGroupMonsterInformations'
}

export type GameRolePlayActor =
  | GameRolePlayGroupMonsterInformations
  | GameRolePlayCharacterInformations
  | GameRolePlayMerchantInformations
  | GameRolePlayNpcInformations
