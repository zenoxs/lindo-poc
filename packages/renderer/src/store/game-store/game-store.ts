import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { Game, GameModel } from './game'

/**
 * Model description here for TypeScript hints.
 */
export const GameStoreModel = types
  .model('GameStore')
  .props({
    games: types.map(GameModel),
    selectedGame: types.safeReference(GameModel)
  })
  .views((self) => ({
    get gameList() {
      return Array.from(self.games.values())
    }
  }))
  .actions((self) => ({
    addGame() {
      const game = self.games.put({})
      self.selectedGame = game
    },
    removeGame(game: Game) {
      if (self.selectedGame === game) {
        if (self.games.size > 1) {
          self.selectedGame = self.gameList.reverse().find((g) => g !== game)
        } else {
          self.selectedGame = undefined
        }
      }
      self.games.delete(game.id)
    },
    selectGame(game: Game) {
      if (self.games.has(game.id)) {
        self.selectedGame = game
      }
    },
    selectGameIndex(index: number) {
      if (self.gameList[index]) {
        self.selectedGame = self.gameList[index]
      }
    }
  }))
  .actions((self) => ({
    selectNextGame() {
      const index = self.gameList.indexOf(self.selectedGame!)
      if (index !== -1) {
        self.selectGameIndex(index + 1)
      }
    },
    selectPreviousGame() {
      const index = self.gameList.indexOf(self.selectedGame!)
      if (index !== -1) {
        self.selectGameIndex(index - 1)
      }
    },
    removeSelectedGame() {
      if (self.selectedGame) {
        self.removeGame(self.selectedGame)
      }
    }
  }))
  // lifecycle hooks
  .actions((self) => ({
    afterCreate() {
      self.addGame()
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type GameStoreType = Instance<typeof GameStoreModel>

export interface GameStore extends GameStoreType {}

type GameStoreSnapshotType = SnapshotOut<typeof GameStoreModel>

export interface GameStoreSnapshot extends GameStoreSnapshotType {}
