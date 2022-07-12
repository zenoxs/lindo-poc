import { EntityLook } from './actor'

export interface CharacterBaseInformations {
  id: number
  name: string
  level: string
  bonusXp: number
  breed: number
  entityLook: EntityLook
  sex: boolean
  _type: 'CharacterBaseInformations'
}
