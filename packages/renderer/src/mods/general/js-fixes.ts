import { DofusWindow } from '@/dofus-window'
import { RootStore } from '@/store'
import { TranslationFunctions } from '@lindo/i18n'
import { Mod } from '../mod'

export class JsFixesMod extends Mod {
  private _disposers: Array<() => void> = []

  constructor(wGame: DofusWindow, rootStore: RootStore, LL: TranslationFunctions) {
    super(wGame, rootStore, LL)
    this.contextLost()
    this.spritesOutOfScreen()
  }

  private contextLost() {
    const onWebGLContextLost = (event: WebGLContextEvent) => {
      console.info('reload webglcontext cause: webglcontextlost')
      this.wGame.isoEngine.background.render()
      event.preventDefault()
    }
    const canvas = this.wGame.document.getElementById('mapScene-canvas') as HTMLCanvasElement
    canvas.addEventListener('webglcontextlost', onWebGLContextLost as never, false)

    this._disposers.push(() => {
      canvas.removeEventListener('webglcontextlost', onWebGLContextLost as never)
    })
  }

  private spritesOutOfScreen() {
    const _refreshAreasBackup = this.wGame.isoEngine.mapScene._refreshAreas
    this.wGame.isoEngine.mapScene._refreshAreas = function () {
      for (const id in this.areasToRefresh) {
        if (this.areasToRefresh[id][3] < this.t) {
          this.areasToRefresh[id][2] = this.t
          this.areasToRefresh[id][3] = this.t + 5
        }
        if (this.areasToRefresh[id][1] < this.l) {
          this.areasToRefresh[id][0] = this.l
          this.areasToRefresh[id][1] = this.l + 5
        }
      }
      _refreshAreasBackup()
    }

    this._disposers.push(() => {
      this.wGame.isoEngine.mapScene._refreshAreas = _refreshAreasBackup
    })
  }

  destroy(): void {
    for (const disposer of this._disposers) {
      disposer()
    }
    this._disposers = []
  }
}
