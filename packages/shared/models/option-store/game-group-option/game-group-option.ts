import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const GameGroupOptionModel = types
  .model('GameGroupOption')
  .props({
    activeOpenMenu: types.optional(types.boolean, false),
    hiddenShop: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    setActiveOpenMenu(value: boolean) {
      self.activeOpenMenu = value
    },
    setHiddenShop(value: boolean) {
      self.hiddenShop = value
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type GameGroupOptionType = Instance<typeof GameGroupOptionModel>

export interface GameGroupOption extends GameGroupOptionType {}

type GameGroupOptionSnapshotType = SnapshotOut<typeof GameGroupOptionModel>

export interface GameGroupOptionSnapshot extends GameGroupOptionSnapshotType {}