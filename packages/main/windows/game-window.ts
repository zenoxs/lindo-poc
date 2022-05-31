import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { EventEmitter } from 'stream'
import TypedEmitter from 'typed-emitter'

type GameWindowEvents = {
  close: (event: Event) => void
}

export class GameWindow extends (EventEmitter as new () => TypedEmitter<GameWindowEvents>) {
  private readonly _win: BrowserWindow

  get id() {
    return this._win.id!
  }

  constructor() {
    super()
    this._win = new BrowserWindow({
      show: false,
      webPreferences: {
        preload: join(__dirname, '../preload/index.cjs'),
        defaultFontSize: 13,
        defaultEncoding: 'UTF-8',
        backgroundThrottling: false
        // webSecurity: false
      }
    })

    console.log(this._win.id)

    this._win.on('close', (event) => {
      console.log('GameWindow ->', 'close')
      this._close(event)
    })

    if (app.isPackaged) {
      this._win.loadFile(join(__dirname, '../renderer/index.html'))
    } else {
      // 🚧 Use ['ENV_NAME'] avoid vite:define plugin

      // eslint-disable-next-line dot-notation
      const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

      this._win.loadURL(url)
      if (process.env.NODE_ENV === 'development') {
        this._win.webContents.openDevTools({ mode: 'detach' })
      }
    }

    // Show window when page is ready
    this._win.webContents.on('did-finish-load', () => {
      this._win.show()
    })

    // Make all links open with the browser, not with the application
    this._win.webContents.setWindowOpenHandler(({ url }) => {
      // if (url.startsWith('https:')) shell.openExternal(url)
      return { action: 'deny' }
    })
  }

  private _close(event: Event) {
    this._win.removeAllListeners()
    this.emit('close', event)
  }

  focus = () => this._win.focus()
  isMinimized = () => this._win.isMinimized()
  restore = () => this._win.restore()
}
