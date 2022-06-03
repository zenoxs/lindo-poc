import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const AppStoreModel = types
  .model('AppStore')
  .props({
    appVersion: types.optional(types.string, '1.0.0'),
    buildVersion: types.optional(types.string, '1.0.0'),
    lindoVersion: types.optional(types.string, '1.0.0')
  })
  .actions((self) => ({
    setAppVersion(appVersion: string) {
      if (self.appVersion !== appVersion) {
        self.appVersion = appVersion
      }
    },
    setBuildVersion(buildVersion: string) {
      if (self.buildVersion !== buildVersion) {
        self.buildVersion = buildVersion
      }
    },
    setLindoVersion(lindoVersion: string) {
      if (self.lindoVersion !== lindoVersion) {
        self.lindoVersion = lindoVersion
      }
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type AppStoreType = Instance<typeof AppStoreModel>

export interface AppStore extends AppStoreType {}

type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>

export interface AppStoreSnapshot extends AppStoreSnapshotType {}
