import { GameUpdater } from './game-updater'

export const runUpdater = async () => {
  const gameUpdater = await GameUpdater.init()
  await gameUpdater.run()
  console.log('runUpdater ->', 'done')
}
