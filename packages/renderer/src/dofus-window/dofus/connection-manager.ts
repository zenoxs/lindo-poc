import TypedEmitter from 'typed-emitter'
import { _GameRolePlayActor } from './actor'
import { _CharacterBaseInformations } from './character'

export interface ChatMessage {
  channel: number
  senderName: string
  content: string
}
export interface PartyInvitationMessage {
  fromName: string
  partyId: number
}
export interface GameRolePlayAggressionMessage {
  defenderId: number
}
export interface TextInformationMessage {
  msgId: number
  parameters: Array<string>
}
export interface TaxMessage {
  guild: {
    id: string
    guildName: string
  }
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
  skillId: number
  duration: number
}
export interface JobExperienceUpdateMessage {
  experiencesUpdate: {
    jobXpNextLevelFloor: number
  }
}
export interface MapComplementaryInformationsDataMessage {
  actors: Array<_GameRolePlayActor>
  fights: Record<
    string,
    {
      fightId: number
      fightTeams: Record<
        string,
        {
          leaderId: number
        }
      >
    }
  >
}
export interface ExchangeStartOkHumanVendorMessage {
  sellerId: number
}
export interface GameRolePlayShowActorMessage {
  id: number
  informations: _GameRolePlayActor
}
export interface GameMapMovementMessage {
  actorId: number
  keyMovements: Array<number>
}

export interface CurrentMapMessage {}
export interface GameContextRemoveElementMessage {
  id: number
  informations: _GameRolePlayActor
}
export interface CharactersListMessage {
  characters: Array<_CharacterBaseInformations>
  _isInitialized: boolean
  _type: 'CharactersListMessage'
  hasStartupActions: boolean
}

export interface BasicWhoIsMessage {
  playerState: number
}

export interface PartyMemberInFightMessage {
  memberId: number
  fightId: number
  fightMap: {
    mapId: number
  }
}
export interface MapComplementaryInformationsWithCoordsMessage extends MapComplementaryInformationsDataMessage {}

export interface PartyJoinMessage {}
export interface PartyUpdateMessage {}
export interface PartyMemberEjectedMessage {}
export interface PartyMemberRemoveMessage {}
export interface PartyNewMemberMessage {}
export interface PartyNewGuestMessage {}
export interface PartyLeaderUpdateMessage {}

export type ConnectionManagerEvents = {
  ChallengeInfoMessage: (msg: ChallengeInfoMessage) => void
  GameFightEndMessage: () => void
  GameFightStartMessage: () => void
  GameFightLeaveMessage: () => void
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
  GameMapMovementMessage: (msg: GameMapMovementMessage) => void
  GameContextRemoveElementMessage: (msg: GameContextRemoveElementMessage) => void
  CharactersListMessage: (msg: CharactersListMessage) => void
  BasicWhoIsMessage: (msg: BasicWhoIsMessage) => void
  CurrentMapMessage: (msg: CurrentMapMessage) => void
  PartyMemberInFightMessage: (msg: PartyMemberInFightMessage) => void
  MapComplementaryInformationsWithCoordsMessage: (msg: MapComplementaryInformationsWithCoordsMessage) => void
  PartyJoinMessage: (msg: PartyJoinMessage) => void
  PartyUpdateMessage: (msg: PartyUpdateMessage) => void
  PartyMemberEjectedMessage: (msg: PartyMemberEjectedMessage) => void
  PartyMemberRemoveMessage: (msg: PartyMemberRemoveMessage) => void
  PartyNewMemberMessage: (msg: PartyNewMemberMessage) => void
  PartyNewGuestMessage: (msg: PartyNewGuestMessage) => void
  PartyLeaderUpdateMessage: (msg: PartyLeaderUpdateMessage) => void
}

export interface ConnectionManager extends TypedEmitter<ConnectionManagerEvents> {}
