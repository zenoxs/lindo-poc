import { SnapshotOut, types } from 'mobx-state-tree'
import { AppStore, AppStoreModel } from '../app-store'
import { ConfStore, ConfStoreModel } from '../conf-store'

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  confStore: types.optional(ConfStoreModel, {}),
  appStore: types.optional(AppStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore {
  confStore: ConfStore
  appStore: AppStore
}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
