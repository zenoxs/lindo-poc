import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { v4 as uuidv4 } from 'uuid'

/**
 * Model description here for TypeScript hints.
 */
export const GameModel = types
  .model('Game')
  .props({
    id: types.optional(types.identifier, () => uuidv4())
  })
  .actions((self) => ({}))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type GameType = Instance<typeof GameModel>

export interface Game extends GameType {}

type GameSnapshotType = SnapshotOut<typeof GameModel>

export interface GameSnapshot extends GameSnapshotType {}
