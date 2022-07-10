import { RootStore, RootStoreSnapshot } from '@lindo/shared'
import ElectronStore from 'electron-store'
import { onSnapshot, applySnapshot, IStateTreeNode } from 'mobx-state-tree'

export interface IOptions {
  storage: ElectronStore<{ rootStore: RootStoreSnapshot }>
  readonly whitelist?: Array<string>
  readonly blacklist?: Array<string>
}
export interface IArgs {
  (name: 'rootStore', store: RootStore & IStateTreeNode, options?: IOptions): Promise<void>
}
type StrToAnyMap = { [key: string]: unknown }

export const persist: IArgs = (name, store, options) => {
  const { storage, whitelist, blacklist } = options ?? {}

  // use AsyncLocalStorage by default (or if localStorage was passed in)
  if (!storage) {
    return Promise.reject(
      new Error(
        'localStorage (the default storage engine) is not ' +
          'supported in this environment. Please configure a different storage ' +
          'engine via the `storage:` option.'
      )
    )
  }

  const whitelistDict = arrToDict(whitelist)
  const blacklistDict = arrToDict(blacklist)

  onSnapshot(store, (_snapshot: StrToAnyMap) => {
    // need to shallow clone as otherwise properties are non-configurable (https://github.com/agilgur5/mst-persist/pull/21#discussion_r348105595)
    const snapshot = { ..._snapshot }
    Object.keys(snapshot).forEach((key) => {
      if (whitelist && !whitelistDict[key]) {
        delete snapshot[key]
      }
      if (blacklist && blacklistDict[key]) {
        delete snapshot[key]
      }
    })
    storage.set(name, snapshot)
  })

  return Promise.resolve(storage.get(name)).then((data) => {
    const snapshot = !isString(data) ? data : JSON.parse(data)
    // don't apply false (which will error), leave store in initial state
    if (!snapshot) {
      return
    }
    try {
      applySnapshot(store, snapshot)
    } catch (e) {
      console.log(e)
    }
  })
}

type StrToBoolMap = { [key: string]: boolean }

function arrToDict(arr?: Array<string>): StrToBoolMap {
  if (!arr) {
    return {}
  }
  return arr.reduce((dict: StrToBoolMap, elem) => {
    dict[elem] = true
    return dict
  }, {})
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export default persist
