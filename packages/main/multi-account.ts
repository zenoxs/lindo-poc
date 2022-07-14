import { IPCEvents, RootStore } from '@lindo/shared'
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

    ipcMain.handle(IPCEvents.SAVE_MASTER_PASSWORD, (event, masterPassword) => {
      return this.saveMasterPassword(masterPassword)
    })

    ipcMain.handle(IPCEvents.IS_MASTER_PASSWORD_CONFIGURED, () => {
      return this.isMasterPasswordConfigured()
    })

    ipcMain.handle(IPCEvents.DECRYPT_CHARACTER_PASSWORD, (event, input: string) => {
      return this.decryptWithMasterPassword(input)
    })

    ipcMain.handle(IPCEvents.ENCRYPT_CHARACTER_PASSWORD, (event, input: string) => {
      return this.encryptWithMasterPassword(input)
    })
  }

  isEnabled() {
    return this.isMasterPasswordConfigured()
  }

  async unlock() {
    const multiAccountWindow = new UnlockWindow(this._rootStore)
    const closeListener = () => {
      multiAccountWindow.close()
    }
    ipcMain.on(IPCEvents.CLOSE_UNLOCK_WINDOW, closeListener)

    // wait for user master password
    this._masterPassword = await new Promise<string>((resolve, reject) => {
      ipcMain.handle(IPCEvents.UNLOCK_APPLICATION, async (event, masterPassword: string) => {
        const passwordOk = await this._checkMasterPassword(masterPassword)
        if (passwordOk) {
          resolve(masterPassword)
          ipcMain.removeHandler(IPCEvents.UNLOCK_APPLICATION)
        }
        return passwordOk
      })
      multiAccountWindow.once('close', () => reject(new Error('Multi-account unlock window was closed')))
    })

    const encryptedState = this._store.get('multiAccountState')
    if (encryptedState) {
      console.log('Multi-account is unlocked, gonna decrypt the store')
      const multiAccountState = JSON.parse(
        crypto.AES.decrypt(encryptedState, this._masterPassword).toString(crypto.enc.Utf8)
      )
      this._rootStore.optionStore.restoreGameMultiAccount(multiAccountState)
    }

    this._rootStore.optionStore.gameMultiAccount.unlock()

    const selectTeamId = await new Promise<string>((resolve, reject) => {
      ipcMain.handleOnce(IPCEvents.SELECT_TEAM_TO_CONNECT, async (event, teamId: string) => {
        resolve(teamId)
      })
      multiAccountWindow.once('close', () => reject(new Error('Multi-account unlock window was closed')))
    })
    console.log(selectTeamId)

    // close the window and unlock the app
    multiAccountWindow.close()
    ipcMain.removeListener(IPCEvents.CLOSE_UNLOCK_WINDOW, closeListener)
    return selectTeamId
  }

  async saveMasterPassword(masterPassword: string) {
    const isEncryptionAvailable = await safeStorage.isEncryptionAvailable()
    let encryptedPassword = await argon2.hash(masterPassword)
    if (!isEncryptionAvailable) {
      console.log('Safe storage is not available, warn multi-account will use non secure storage')
      this._store.set('useSecureStorage', false)
    } else {
      const buffer = safeStorage.encryptString(encryptedPassword)
      encryptedPassword = JSON.stringify(buffer.toJSON())
      this._store.set('useSecureStorage', true)
    }
    this._store.set('masterPassword', encryptedPassword)
  }

  async isMasterPasswordConfigured(): Promise<boolean> {
    return this._store.has('masterPassword')
  }

  private async _checkMasterPassword(input: string): Promise<boolean> {
    const encryptedPassword = this._store.get('masterPassword')
    const isEncrypted = this._store.get('useSecureStorage')
    let hashedPassword = encryptedPassword
    if (isEncrypted) {
      const buffer = Buffer.from(JSON.parse(encryptedPassword))
      hashedPassword = await safeStorage.decryptString(buffer)
    }
    return argon2.verify(hashedPassword, input)
  }

  encryptWithMasterPassword(input: string) {
    if (this._masterPassword) {
      return crypto.AES.encrypt(input, this._masterPassword).toString()
    }
    throw new Error('Master password is not configured')
  }

  decryptWithMasterPassword(input: string) {
    if (this._masterPassword) {
      return crypto.AES.decrypt(input, this._masterPassword).toString(crypto.enc.Utf8)
    }
    throw new Error('Master password is not configured')
  }
}
