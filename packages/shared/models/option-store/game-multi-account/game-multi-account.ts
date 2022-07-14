import { cast, flow, Instance, SnapshotOut, types } from 'mobx-state-tree'
import { GameCharacter, GameCharacterModel, GameCharacterSnapshot, GameCharacterSnapshotIn } from './game-character'
import { GameTeam, GameTeamModel, GameTeamSnapshot, GameTeamSnapshotIn } from './game-team'

/**
 * Model description here for TypeScript hints.
 */
export const GameMultiAccountModel = types
  .model('GameMultiAccount')
  .props({
    locked: types.optional(types.boolean, true),
    teams: types.array(GameTeamModel),
    characters: types.array(GameCharacterModel)
  })
  .views((self) => ({
    get isEnabled() {
      return !self.locked && self.teams.length > 0
    }
  }))
  .actions((self) => ({
    unlock() {
      self.locked = false
    },
    addCharacter: flow(function* (character: GameCharacterSnapshotIn) {
      self.characters.push({
        ...character,
        password: yield window.lindoAPI.encryptCharacterPassword(character.password)
      })
    }),
    removeCharacter(character: GameCharacter | GameCharacterSnapshot) {
      self.characters.remove(character)
    },
    addTeam(team: GameTeamSnapshotIn) {
      self.teams.push(team)
    },
    updateTeam(team: GameTeamSnapshot) {
      const index = self.teams.findIndex((t) => t.id === team.id)!
      self.teams[index] = cast(team)
    },
    removeTeam(team: GameTeam) {
      self.teams.remove(team)
    },
    selectTeamById(teamId: string) {
      return self.teams.find((t) => t.id === teamId)
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type GameMultiAccountType = Instance<typeof GameMultiAccountModel>

export interface GameMultiAccount extends GameMultiAccountType {}

type GameMultiAccountSnapshotType = SnapshotOut<typeof GameMultiAccountModel>

export interface GameMultiAccountSnapshot extends GameMultiAccountSnapshotType {}
