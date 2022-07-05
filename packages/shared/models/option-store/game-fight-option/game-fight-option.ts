import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const GameFightOptionModel = types
  .model('GameFightOption')
  .props({
    healthBar: types.optional(types.boolean, true),
    dammageEstimator: types.optional(types.boolean, true),
    verticalTimeline: types.optional(types.boolean, false),
    challengeBonus: types.optional(types.boolean, false),
    focusOnFightTurn: types.optional(types.boolean, true),
    fightChronometer: types.optional(types.boolean, true),
    monsterTooltip: types.optional(types.boolean, true)
  })
  .actions((self) => ({
    setFocusOnFightTurn(value: boolean) {
      self.focusOnFightTurn = value
    }
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type GameFightOptionType = Instance<typeof GameFightOptionModel>

export interface GameFightOption extends GameFightOptionType {}

type GameFightOptionSnapshotType = SnapshotOut<typeof GameFightOptionModel>

export interface GameFightOptionSnapshot extends GameFightOptionSnapshotType {}
