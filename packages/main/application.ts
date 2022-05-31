import { app, Menu } from 'electron'
import { getAppMenu } from './menu'
import { GameWindow } from './windows'

export class Application {
  static instance = new Application()

  private _gWindows: Array<GameWindow> = []

  run() {
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

    Menu.setApplicationMenu(getAppMenu())
    this.createGameWindow()
  }

  createGameWindow() {
    console.log('Application ->', '_createGameWindow')
    const gWindow = new GameWindow()
    gWindow.on('close', () => {
      this._gWindows.splice(this._gWindows.indexOf(gWindow), 1)
    })
    this._gWindows.push(gWindow)
  }
}
