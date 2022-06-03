import { RootStore } from '@lindo/shared'
import { GameUpdater } from './game-updater'

export const runUpdater = async (rootStore: RootStore) => {
  const gameUpdater = await GameUpdater.init(rootStore)
  await gameUpdater.run()
  console.log('runUpdater ->', 'done')
}
