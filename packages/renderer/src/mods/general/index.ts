import { AutoFocusMod } from './auto-focus'
import { ChatHistoryMod } from './chat-history'
import { CssOverloadMod } from './css-overload'

export * from './auto-focus'
export * from './chat-history'
export * from './css-overload'

export const GENERALS_MOD = [AutoFocusMod, ChatHistoryMod, CssOverloadMod] as const
