export interface Actor {
  id: number
  moving: boolean
  canMoveDiagonally: boolean
  cellId: number
  cancelMovement: (callback: () => void) => void
}
