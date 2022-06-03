export interface DofusWindow extends Window {
  initDofus: (callback: () => void) => void
  openDatabase: unknown
}

export interface HTMLIFrameElementWithDofus extends HTMLIFrameElement {
  contentWindow: DofusWindow
}
