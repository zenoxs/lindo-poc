import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const GameInterfaceOptionModel = types
  .model('GameInterfaceOption')
  .props({
    activeOpenMenu: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    setActiveOpenMenu(value: boolean) {
      self.activeOpenMenu = value
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type GameInterfaceOptionType = Instance<typeof GameInterfaceOptionModel>

export interface GameInterfaceOption extends GameInterfaceOptionType {}

type GameInterfaceOptionSnapshotType = SnapshotOut<typeof GameInterfaceOptionModel>

export interface GameInterfaceOptionSnapshot extends GameInterfaceOptionSnapshotType {}
