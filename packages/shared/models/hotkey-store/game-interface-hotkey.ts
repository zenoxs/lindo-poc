import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const GameInterfaceHotkeyModel = types
  .model('GameActionHotkey')
  .props({
    carac: types.optional(types.string, 'C'),
    spell: types.optional(types.string, 'S'),
    bag: types.optional(types.string, 'I'),
    bidhouse: types.optional(types.string, 'H'),
    map: types.optional(types.string, 'M'),
    friend: types.optional(types.string, 'F'),
    book: types.optional(types.string, 'Q'),
    guild: types.optional(types.string, 'G'),
    conquest: types.optional(types.string, 'K'),
    job: types.optional(types.string, 'J'),
    alliance: types.optional(types.string, ''),
    mount: types.optional(types.string, 'N'),
    directory: types.optional(types.string, ''),
    aignement: types.optional(types.string, ''),
    bestiary: types.optional(types.string, 'B'),
    title: types.optional(types.string, 'T'),
    achievement: types.optional(types.string, 'U'),
    dailyQuest: types.optional(types.string, 'X'),
    spouse: types.optional(types.string, 'L'),
    shop: types.optional(types.string, 'V'),
    goultine: types.optional(types.string, 'R')
  })
  .actions((self) => ({
    setCarac(hotkey: string) {
      self.carac = hotkey
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type GameActionHotkeyType = Instance<typeof GameInterfaceHotkeyModel>

export interface GameActionHotkey extends GameActionHotkeyType {}

type GameActionHotkeySnapshotType = SnapshotOut<typeof GameInterfaceHotkeyModel>

export interface GameActionHotkeySnapshot extends GameActionHotkeySnapshotType {}
