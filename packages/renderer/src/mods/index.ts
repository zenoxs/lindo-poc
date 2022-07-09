import { ChallPercentMod } from './chall-percent'
import { DamageEstimatorMod } from './damage-estimator'
import { FightChronometerMod } from './fight-chronometer'
import { HealthBarMod } from './health-bar'
import { NotificationsMod } from './notifications'
import { ShortcutsMod } from './shortcuts'

export * from './shortcuts'
export * from './notifications'
export * from './damage-estimator'
export * from './chall-percent'
export * from './health-bar'
export * from './fight-chronometer'

export const MODS = [
  ShortcutsMod,
  NotificationsMod,
  DamageEstimatorMod,
  ChallPercentMod,
  HealthBarMod,
  FightChronometerMod
] as const
