import { RootStore } from '@lindo/shared'
import { ipcMain, safeStorage } from 'electron'
import crypto from 'crypto-js'
import * as argon2 from 'argon2'
import ElectronStore from 'electron-store'
import { onSnapshot } from 'mobx-state-tree'
import { UnlockWindow } from './windows'

interface MultiAccountStore {
  masterPassword: string
  isEncrypted: boolean
}

interface MultiAccountStore {
  masterPassword: string
  useSecureStorage: boolean
  multiAccountState: string
}

export class MultiAccount {
  private _store = new ElectronStore<MultiAccountStore>()
  private _rootStore: RootStore
  private _masterPassword?: string

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore

    onSnapshot(rootStore.optionStore.gameMultiAccount, (snapshot) => {
      if (!rootStore.optionStore.gameMultiAccount.locked && this._masterPassword) {
        console.log('Multi-account is unlocked, gonna encrypt the store')
        const encryptedState = crypto.AES.encrypt(JSON.stringify(snapshot), this._masterPassword).toString()
        this._store.set('multiAccountState', encryptedState)
      }
    })
  }

  isEnabled() {
    return this.isMasterPasswordConfigured()
  }

  async unlock() {
    this._masterPassword = 'test'
    const multiAccountWindow = new UnlockWindow(this._rootStore)
    this._masterPassword = await new Promise<string>((resolve, reject) => {
      ipcMain.handleOnce('multi-account-unlock', async (event, masterPassword) => {
        resolve(masterPassword)
      })
      multiAccountWindow.on('close', () => reject(new Error('Multi-account unlock window was closed')))
    })
    multiAccountWindow.close()

    const encryptedState = this._store.get('multiAccountState')
    if (encryptedState) {
      console.log('Multi-account is unlocked, gonna decrypt the store')
      const multiAccountState = JSON.parse(
        crypto.AES.decrypt(encryptedState, this._masterPassword).toString(crypto.enc.Utf8)
      )
      this._rootStore.optionStore.restoreGameMultiAccount(multiAccountState)
    }

    this._rootStore.optionStore.gameMultiAccount.unlock()
  }

  async saveMasterPassword(masterPassword: string) {
    const isEncryptionAvailable = await safeStorage.isEncryptionAvailable()
    let encryptedPassword = await argon2.hash(masterPassword)
    console.log(encryptedPassword)
    if (!isEncryptionAvailable) {
      console.log('Safe storage is not available, warn multi-account will use non secure storage')
      this._store.set('useSecureStorage', false)
    } else {
      const buffer = safeStorage.encryptString(masterPassword)
      encryptedPassword = JSON.stringify(buffer.toJSON())
      this._store.set('useSecureStorage', true)
    }
    this._store.set('masterPassword', encryptedPassword)
  }

  async isMasterPasswordConfigured(): Promise<boolean> {
    return this._store.has('masterPassword')
  }

  async checkMasterPassword(input: string): Promise<boolean> {
    const encryptedPassword = this._store.get('masterPassword')
    const isEncrypted = this._store.get('useSecureStorage')
    let hashedPassword = encryptedPassword
    if (isEncrypted) {
      const buffer = Buffer.from(JSON.parse(encryptedPassword))
      hashedPassword = await safeStorage.decryptString(buffer)
    }
    return argon2.verify(hashedPassword, input)
  }
}
