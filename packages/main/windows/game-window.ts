import { RootStore } from '@lindo/shared'
import { app, BeforeSendResponse, BrowserWindow } from 'electron'
import { attachTitlebarToWindow } from 'custom-electron-titlebar/main'
import { join } from 'path'
import { EventEmitter } from 'stream'
import TypedEmitter from 'typed-emitter'
import { generateUserArgent } from '../utils'

type GameWindowEvents = {
  close: (event: Event) => void
}
export class GameWindow extends (EventEmitter as new () => TypedEmitter<GameWindowEvents>) {
  private readonly _win: BrowserWindow
  private readonly _store: RootStore

  get id() {
    return this._win.id!
  }

  private constructor(userAgent: string, store: RootStore) {
    super()
    this._store = store
    this._win = new BrowserWindow({
      show: false,
      resizable: true,
      title: 'Lindo',
      fullscreen: this._store.optionStore.window.fullScreen,
      width: this._store.optionStore.window.resolution.width,
      height: this._store.optionStore.window.resolution.height,
      titleBarStyle: 'hidden',
      webPreferences: {
        preload: join(__dirname, '../preload/index.cjs'),
        backgroundThrottling: false,
        allowRunningInsecureContent: true,
        webviewTag: true,
        webSecurity: false // require to load dofus files
      }
    })

    // when Referer is send to the ankama server, the request can be blocked
    this._win.webContents.session.webRequest.onBeforeSendHeaders(
      {
        urls: ['https://static.ankama.com/*']
      },
      (details, callback) => {
        const requestHeaders = { ...(details.requestHeaders ?? {}) }
        delete requestHeaders.Referer
        const beforeSendResponse: BeforeSendResponse = { requestHeaders }
        callback(beforeSendResponse)
      }
    )

    this._win.webContents.setUserAgent(userAgent)

    this._win.webContents.setAudioMuted(this._store.optionStore.window.audioMuted)

    this._win.on('close', (event) => {
      console.log('GameWindow ->', 'close')
      this._close(event)
    })

    this._win.on('focus', () => {
      if (this._store.optionStore.window.soundOnFocus && !this._store.optionStore.window.audioMuted) {
        this._win.webContents.setAudioMuted(false)
      }
    })

    this._win.on('blur', () => {
      if (this._store.optionStore.window.soundOnFocus && !this._store.optionStore.window.audioMuted) {
        this._win.webContents.setAudioMuted(true)
      }
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

    attachTitlebarToWindow(this._win)
  }

  static async init(store: RootStore): Promise<GameWindow> {
    const userAgent = await generateUserArgent()
    return new GameWindow(userAgent, store)
  }

  private _close(event: Event) {
    this._win.removeAllListeners()
    this.emit('close', event)
  }

  focus = () => this._win.focus()
  isMinimized = () => this._win.isMinimized()
  restore = () => this._win.restore()
}
