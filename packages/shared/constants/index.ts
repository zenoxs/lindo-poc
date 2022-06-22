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

export const RESOLUTIONS: ReadonlyArray<NameValue> = <const>[
  { name: '800x600', value: '800;600' },
  { name: '960x600', value: '960;600' },
  { name: '1280x720', value: '1280;720' },
  { name: '1024x768', value: '1024;768' },
  { name: '1366x768', value: '1366;768' },
  { name: '1440x900', value: '1440;900' },
  { name: '1600x900', value: '1600;900' },
  { name: '1280x1024', value: '1280;1024' },
  { name: '1680x1050', value: '1680;1050' },
  { name: '1920x1080', value: '1920;1080' },
  { name: '2560x1440', value: '2560;1440' }
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
