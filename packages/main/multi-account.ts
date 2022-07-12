import { safeStorage } from 'electron'
import ElectronStore from 'electron-store'

interface MultiAccountStore {
  masterPassword: string
  isEncrypted: boolean
}

export class MultiAccount {
  private _store = new ElectronStore<MultiAccountStore>()

  async saveMasterPassword(masterPassword: string) {
    const isEncryptionAvailable = await safeStorage.isEncryptionAvailable()
    let encryptedPassword = masterPassword
    if (!isEncryptionAvailable) {
      console.log('Safe storage is not available, warn multi-account will use non secure storage')
    } else {
      const buffer = safeStorage.encryptString(masterPassword)
      encryptedPassword = JSON.stringify(buffer.toJSON())
      this._store.set('isEncrypted', true)
    }
    this._store.set('masterPassword', encryptedPassword)
  }

  async isMasterPasswordConfigured(): Promise<boolean> {
    return this._store.has('masterPassword')
  }

  async checkMasterPassword(input: string): Promise<boolean> {
    const encryptedPassword = this._store.get('masterPassword')
    const isEncrypted = this._store.get('isEncrypted')
    let password = encryptedPassword
    if (isEncrypted) {
      const buffer = Buffer.from(JSON.parse(encryptedPassword))
      password = await safeStorage.decryptString(buffer)
    }

    return password === input
  }
}
