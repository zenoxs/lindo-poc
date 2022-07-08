import { ChallPercentMod } from './chall-percent'
import { DamageEstimatorMod } from './damage-estimator'
import { NotificationsMod } from './notifications'
import { ShortcutsMod } from './shortcuts'

export * from './shortcuts'
export * from './notifications'
export * from './damage-estimator'

export const MODS = [ShortcutsMod, NotificationsMod, DamageEstimatorMod, ChallPercentMod] as const
