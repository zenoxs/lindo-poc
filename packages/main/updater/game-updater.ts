import { UpdaterWindow } from '../windows/updater-window'

export class GameUpdater {
  private readonly _updaterWindow: UpdaterWindow

  private constructor(updaterWindow: UpdaterWindow) {
    this._updaterWindow = updaterWindow
  }

  static async init(): Promise<GameUpdater> {
    const updaterWindow = await UpdaterWindow.init()
    return new GameUpdater(updaterWindow)
  }

  run() {}
}
