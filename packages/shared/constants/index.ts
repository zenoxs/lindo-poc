/* eslint-disable no-unused-vars */
export enum IPCEvents {
  INIT_STATE = 'mobx.INIT_STATE',
  INIT_STATE_ASYNC = 'mobx.INIT_STATE_ASYNC',
  PATCH = 'mobx.PATCH',
  OPEN_OPTION = 'OPEN_OPTION',
  UPDATE_PROGRESS = 'UPDATE_PROGRESS',
  GET_GAME_CONTEXT = 'GET_GAME_CONTEXT',
  NEW_TAB = 'NEW_TAB',
  CLOSE_TAB = 'CLOSE_TAB',
  PREV_TAB = 'PREV_TAB',
  NEXT_TAB = 'NEXT_TAB'
}

export interface NameValue {
  name: string
  value: string
}

export const RESOLUTIONS: ReadonlyArray<string> = <const>[
  '800x600',
  '960x600',
  '1280x720',
  '1024x768',
  '1366x768',
  '1440x900',
  '1600x900',
  '1280x1024',
  '1920x1080',
  '2560x1440'
]

export const LANGUAGES: ReadonlyArray<NameValue> = <const>[
  { name: 'Français', value: 'fr' },
  { name: 'English', value: 'en' },
  { name: 'Español', value: 'es' },
  { name: 'Italiano', value: 'it' },
  { name: 'Português', value: 'pt' },
  { name: 'Polskie', value: 'pl' },
  { name: 'Türkçe', value: 'tr' }
]
