import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { GameCharacterModel, GameCharacterSnapshotIn } from './game-character'

/**
 * Model description here for TypeScript hints.
 */
export const GameMultiAccountModel = types
  .model('GameMultiAccount')
  .props({
    locked: types.optional(types.boolean, true),
    characters: types.array(GameCharacterModel)
  })
  .actions((self) => ({
    addCharacter(character: GameCharacterSnapshotIn) {
      self.characters.push(character)
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
