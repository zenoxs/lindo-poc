import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { GameCharacter, GameCharacterModel, GameCharacterSnapshotIn } from './game-character'
import { GameTeamModel, GameTeamSnapshotIn } from './game-team'

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
  .actions((self) => ({
    addCharacter(character: GameCharacterSnapshotIn) {
      self.characters.push(character)
    },
    removeCharacter(character: GameCharacter) {
      self.characters.remove(character)
    },
    addTeam(team: GameTeamSnapshotIn) {
      self.teams.push(team)
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
