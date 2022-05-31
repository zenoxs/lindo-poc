import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'

export class GameWindow {
  private readonly _win: BrowserWindow
  constructor() {
    console.log('GameWindow ->', 'constructor')
    console.log(join(__dirname, '../preload/index.cjs'))
    this._win = new BrowserWindow({
      webPreferences: {
        preload: join(__dirname, '../preload/index.cjs')
        // defaultFontSize: 13,
        // defaultEncoding: 'UTF-8',
        // backgroundThrottling: false,
        // webSecurity: false
      }
    })
    this._win.on('close', () => {
      console.log('GameWindow ->', 'close')
      this._close()
    })

    if (app.isPackaged) {
      this._win.loadFile(join(__dirname, '../renderer/index.html'))
    } else {
      // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
      const url = `http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}`

      this._win.loadURL(url)
      if (process.env.NODE_ENV === 'development') {
        this._win.webContents.openDevTools({ mode: 'detach' })
      }
      // win.webContents.openDevTools()
    }

    // Test active push message to Renderer-process
    this._win.webContents.on('did-finish-load', () => {
      console.log('GameWindow ->', 'did-finish-load')
      // send message to renderer process
    })

    this._win.webContents.on('did-finish-load', () => {
      this._win.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // Make all links open with the browser, not with the application
    this._win.webContents.setWindowOpenHandler(({ url }) => {
      // if (url.startsWith('https:')) shell.openExternal(url)
      return { action: 'deny' }
    })

    // this._win.show()
  }

  private _close() {
    this._win.removeAllListeners()
  }

  focus = () => this._win.focus()
  isMinimized = () => this._win.isMinimized()
  restore = () => this._win.restore()
}
