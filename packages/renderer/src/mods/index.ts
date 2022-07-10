import { ChallengePercentMod } from './challenge-percent'
import { DamageEstimatorMod } from './damage-estimator'
import { FightChronometerMod } from './fight-chronometer'
import { HealthBarMod } from './health-bar'
import { NotificationsMod } from './notifications'
import { ShortcutsMod } from './shortcuts'
import { VerticalTimelineMod } from './vertical-timeline'

export * from './shortcuts'
export * from './notifications'
export * from './damage-estimator'
export * from './challenge-percent'
export * from './health-bar'
export * from './fight-chronometer'
export * from './vertical-timeline'

export const MODS = [
  ShortcutsMod,
  NotificationsMod,
  DamageEstimatorMod,
  ChallengePercentMod,
  HealthBarMod,
  FightChronometerMod,
  VerticalTimelineMod
] as const
