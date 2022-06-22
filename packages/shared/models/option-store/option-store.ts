import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { WindowOptionModel } from './window-option'

// TODO: remove later only for POC

/**
 * Model description here for TypeScript hints.
 */
export const OptionStoreModel = types.model('OptionStore').props({
  window: types.optional(WindowOptionModel, {})
})

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type OptionStoreType = Instance<typeof OptionStoreModel>

export interface OptionStore extends OptionStoreType {}

type OptionStoreSnapshotType = SnapshotOut<typeof OptionStoreModel>

export interface OptionStoreSnapshot extends OptionStoreSnapshotType {}
