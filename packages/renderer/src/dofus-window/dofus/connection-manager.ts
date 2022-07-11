import TypedEmitter from 'typed-emitter'
import { Actor } from '../iso-engine'

export interface Guild {
  id: string
  guildName: string
}

export interface ChatMessage {
  channel: number
  senderName: string
  content: string
}

export interface PartyInvitationMessage {
  fromName: string
}
export interface GameRolePlayAggressionMessage {
  defenderId: number
}

export interface TextInformationMessage {
  msgId: number
  parameters: Array<string>
}

export interface TaxMessage {
  guild: Guild
  worldX: number
  worldY: number
  enrichData: {
    subAreaName: string
    firstName: string
    lastName: string
  }
}

export interface ChallengeInfoMessage {
  xpBonus: number
  challengeId: number
}

export interface InventoryWeightMessage {
  weightMax: number
  weight: number
}

export interface StatedElementUpdatedMessage {
  statedElement: {
    elementId: number
    elementCellId: number
  }
}

export interface InteractiveUsedMessage {
  elemId: number
  entityId: number
  duration: number
}

export interface JobExperienceUpdateMessage {
  experiencesUpdate: {
    jobXpNextLevelFloor: number
  }
}

export interface MapComplementaryInformationsDataMessage {
  actors: Array<Actor>
}

export interface ExchangeStartOkHumanVendorMessage {
  sellerId: number
}

export interface GameRolePlayShowActorMessage {
  informations: {
    _type: string
  }
}

export type ConnectionManagerEvents = {
  ChallengeInfoMessage: (msg: ChallengeInfoMessage) => void
  GameFightEndMessage: () => void
  GameFightStartMessage: () => void
  GameFightLeaveMessage: () => void
  MapComplementaryInformationsWithCoordsMessage: () => void
  MapComplementaryInformationsDataMessage: (msg: MapComplementaryInformationsDataMessage) => void
  ChatServerMessage: (msg: ChatMessage) => void
  TaxCollectorAttackedMessage: (tax: TaxMessage) => void
  GameRolePlayArenaFightPropositionMessage: (e: unknown) => void
  PartyInvitationMessage: (msg: PartyInvitationMessage) => void
  GameRolePlayAggressionMessage: (msg: GameRolePlayAggressionMessage) => void
  TextInformationMessage: (msg: TextInformationMessage) => void
  GameFightTurnStartMessage: () => void
  GameFightTurnEndMessage: () => void
  GameActionFightLifePointsGainMessage: () => void
  InventoryWeightMessage: (msg: InventoryWeightMessage) => void
  StatedElementUpdatedMessage: (msg: StatedElementUpdatedMessage) => void
  InteractiveUsedMessage: (msg: InteractiveUsedMessage) => void
  InteractiveUseEndedMessage: () => void
  GameFightStartingMessage: () => void
  JobExperienceUpdateMessage: (msg: JobExperienceUpdateMessage) => void
  ExchangeStartOkHumanVendorMessage: (msg: ExchangeStartOkHumanVendorMessage) => void
  ExchangeLeaveMessage: () => void
  GameRolePlayShowActorMessage: (msg: GameRolePlayShowActorMessage) => void
}

export interface ConnectionManager extends TypedEmitter<ConnectionManagerEvents> {}
