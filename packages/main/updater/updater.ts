import { GameUpdater } from './game-updater'

export const runUpdater = async () => {
  const gameUpdater = await GameUpdater.init()
  gameUpdater.run()
}
