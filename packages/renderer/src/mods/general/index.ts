import { AutoFocusMod } from './auto-focus'
import { ChatHistoryMod } from './chat-history'
import { CssOverloadMod } from './css-overload'
import { InactivityMod } from './inactivity'
import { JsFixesMod } from './js-fixes'
import { KeyboardInputPadMod } from './keyboard-input-pad'

export * from './auto-focus'
export * from './chat-history'
export * from './css-overload'
export * from './inactivity'
export * from './js-fixes'
export * from './keyboard-input-pad'

export const GENERALS_MOD = [
  AutoFocusMod,
  ChatHistoryMod,
  CssOverloadMod,
  InactivityMod,
  JsFixesMod,
  KeyboardInputPadMod
] as const
