import { ChallPercentMod } from './chall-percent'
import { DamageEstimatorMod } from './damage-estimator'
import { HealthBarMod } from './health-bar'
import { NotificationsMod } from './notifications'
import { ShortcutsMod } from './shortcuts'

export * from './shortcuts'
export * from './notifications'
export * from './damage-estimator'

export const MODS = [ShortcutsMod, NotificationsMod, DamageEstimatorMod, ChallPercentMod, HealthBarMod] as const
