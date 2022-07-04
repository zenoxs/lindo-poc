import { GameContext, IPCEvents, RootStore } from '@lindo/shared'
import { app, ipcMain, Menu } from 'electron'
import express from 'express'
import getPort from 'get-port'
import { Server } from 'http'
import { observe } from 'mobx'
import { AddressInfo } from 'net'
import { GAME_PATH } from './constants'
import { getAppMenu } from './menu'
import { runUpdater } from './updater'
import { GameWindow, OptionWindow } from './windows'

export class Application {
  private static _instance: Application

  static async init(rootStore: RootStore) {
    if (Application._instance) {
      throw new Error('Application already initialized')
    }

    // create express server to serve game file
    const serveGameServer = express()
    serveGameServer.use('/', express.static(GAME_PATH))
    const port = await getPort({ port: 3000 })
    const server: Server = serveGameServer.listen(port)

    Application._instance = new Application(rootStore, server)
  }

  static get instance(): Application {
    if (!Application._instance) {
      throw new Error('Application not initialized')
    }
    return Application._instance
  }

  private _gWindows: Array<GameWindow> = []
  private _optionWindow?: OptionWindow

  private constructor(private _rootStore: RootStore, private _serveGameServer: Server) {}

  async run() {
    // handlers
    ipcMain.handle(IPCEvents.GET_GAME_CONTEXT, (event) => {
      const serverAddress: AddressInfo = this._serveGameServer.address() as AddressInfo
      const context: GameContext = {
        gameSrc: 'http://localhost:' + serverAddress.port + '/index.html?delayed=true',
        windowId: event.sender.id
      }
      return JSON.stringify(context)
    })

    ipcMain.on(IPCEvents.OPEN_OPTION, (event) => {
      this.openOptionWindow()
    })

    ipcMain.on(IPCEvents.TOGGLE_MAXIMIZE_WINDOW, (event) => {
      console.log('Application ->', 'TOGGLE_MAXIMIZE_WINDOW')
      const gWindow = this._gWindows.find((gWindow) => gWindow.id === event.sender.id)
      if (gWindow) {
        gWindow.toggleMaximize()
      }
    })

    await runUpdater(this._rootStore)

    app.on('second-instance', () => {
      console.log('Application ->', 'second-instance')
      if (this._gWindows.length) {
        // Focus on the main window if the user tried to open another
        if (this._gWindows[0].isMinimized()) this._gWindows[0].restore()
        this._gWindows[0].focus()
      }
    })

    app.on('activate', () => {
      console.log('Application ->', 'activate')
      if (this._gWindows.length) {
        this._gWindows[0].focus()
      } else {
        this.createGameWindow()
      }
    })

    this._setAppMenu()
    this.createGameWindow()
  }

  private _setAppMenu() {
    Menu.setApplicationMenu(getAppMenu(this._rootStore.hotkeyStore.window))
    console.log('Application ->', '_setAppMenu')
    observe(this._rootStore.hotkeyStore.window, (change) => {
      console.log('Application ->', '_setAppMenu')
      if (change.type === 'update') {
        Menu.setApplicationMenu(getAppMenu(this._rootStore.hotkeyStore.window))
      }
    })
  }

  async createGameWindow() {
    console.log('Application ->', '_createGameWindow')
    const gWindow = await GameWindow.init(this._rootStore)
    gWindow.on('close', () => {
      this._gWindows.splice(this._gWindows.indexOf(gWindow), 1)
    })
    this._gWindows.push(gWindow)
  }

  openOptionWindow() {
    console.log('Application ->', 'openOptionWindow')
    if (this._optionWindow) {
      this._optionWindow.focus()
      return
    }
    this._optionWindow = new OptionWindow()
    this._optionWindow.on('close', () => {
      this._optionWindow = undefined
    })
  }
}
