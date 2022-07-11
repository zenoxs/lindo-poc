import { ActorManager } from './actor-manager'
import { MapCell, MapDirection } from './map'

export interface IsoEngine {
  background: {
    render: () => void
  }
  _castSpellImmediately: (cellId: number) => void
  mapScene: {
    l: number
    t: number
    areasToRefresh: Record<string, Array<number>>
    convertSceneToCanvasCoordinate: (
      x: number,
      y: number
    ) => {
      x: number
      y: number
    }
    _refreshAreas: () => void
  }
  gotoNeighbourMap: (direction: MapDirection, cell: number, x: number, y: number) => void
  mapRenderer: {
    isFightMode: boolean
    mapId: number
    isWalkable: (cell: number) => boolean
    getChangeMapFlags: (cell: number) => Record<MapDirection, boolean>
    getCellSceneCoordinate: (cell: number) => {
      x: number
      y: number
    }
    map: {
      cells: MapCell[]
    }
    grid: {
      getCoordinateGridFromCellId: (cellId: number) => {
        i: number // x
        j: number // y
      }
    }
  }
  actorManager: ActorManager
}
