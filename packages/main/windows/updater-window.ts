import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { EventEmitter } from 'stream'
import TypedEmitter from 'typed-emitter'
import { generateUserArgent } from '../utils'

type UpdaterWindowEvents = {
  close: (event: Event) => void
}

export class UpdaterWindow extends (EventEmitter as new () => TypedEmitter<UpdaterWindowEvents>) {
  private readonly _win: BrowserWindow

  private constructor(userAgent: string) {
    super()
    this._win = new BrowserWindow({
      show: false,
      width: 700,
      height: 190,
      title: 'Updater',
      webPreferences: {
        preload: join(__dirname, '../preload/index.cjs'),
        defaultFontSize: 13,
        defaultEncoding: 'UTF-8',
        backgroundThrottling: false
        // webSecurity: false
      }
    })
    this._win.webContents.setUserAgent(userAgent)

    this._win.on('close', (event) => {
      console.log('UpdaterWindow ->', 'close')
      this._handleClose(event)
    })

    if (app.isPackaged) {
      this._win.loadFile(join(__dirname, '../renderer/index.html#/updater'))
    } else {
      // 🚧 Use ['ENV_NAME'] avoid vite:define plugin

      // eslint-disable-next-line dot-notation
      const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}#/updater`

      this._win.loadURL(url)
      if (process.env.NODE_ENV === 'development') {
        this._win.webContents.openDevTools({ mode: 'detach' })
      }
    }

    // Show window when page is ready
    this._win.webContents.on('did-finish-load', () => {
      this._win.show()
    })
  }

  static async init(): Promise<UpdaterWindow> {
    const userAgent = await generateUserArgent()
    return new UpdaterWindow(userAgent)
  }

  private _handleClose(event: Event) {
    this._win.removeAllListeners()
    this.emit('close', event)
  }

  close() {
    this._win.close()
  }

  focus = () => this._win.focus()
  isMinimized = () => this._win.isMinimized()
  restore = () => this._win.restore()
}
