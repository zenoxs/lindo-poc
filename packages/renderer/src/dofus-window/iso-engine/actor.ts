export interface Actor {
  id: number
  moving: boolean
  canMoveDiagonally: boolean
  cellId: number
  contextualId: number
  disposition: {
    cellId: number
  }
  cancelMovement: (callback: () => void) => void
  isMerchant: () => boolean
  _type: string
}
