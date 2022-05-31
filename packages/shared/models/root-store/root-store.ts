import { SnapshotOut, types } from 'mobx-state-tree'
import { ConfStore, ConfStoreModel } from '../conf-store'

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  confStore: types.optional(ConfStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore {
  confStore: ConfStore
}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
