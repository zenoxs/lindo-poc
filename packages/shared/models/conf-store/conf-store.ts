import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const ConfStoreModel = types
  .model('ConfStore')
  .props({
    appName: types.optional(types.string, 'Demo')
  })
  .actions((self) => ({
    setAppName(appName: string) {
      self.appName = appName
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type ConfStoreType = Instance<typeof ConfStoreModel>

export interface ConfStore extends ConfStoreType {}

type ConfStoreSnapshotType = SnapshotOut<typeof ConfStoreModel>

export interface ConfStoreSnapshot extends ConfStoreSnapshotType {}
