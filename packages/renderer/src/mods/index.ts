import { NotificationsMod } from './notifications'
import { ShortcutsMod } from './shortcuts'

export * from './shortcuts'
export * from './notifications'

export const MODS = [ShortcutsMod, NotificationsMod] as const
