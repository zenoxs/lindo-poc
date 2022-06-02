import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import { app } from 'electron'
import fs from 'fs-extra'
import path from 'path'
import * as beautify from 'js-beautify'
import { UpdaterWindow } from '../windows/updater-window'
import { Files, ItunesLookup, Manifest, RegexPatches } from './models'
import { DiffManifest, retrieveManifests } from './updater-utils'

interface GameVersion {
  buildVersion: string
  appVersion: string
}

export class GameUpdater {
  private readonly _updaterWindow: UpdaterWindow

  // origins
  private readonly _dofusOrigin = 'https://proxyconnection.touch.dofus.com/'
  private readonly _dofusOriginItunes = 'https://itunes.apple.com/lookup?id=1041406978&t=' + new Date().getTime()

  // paths
  private readonly _gamePath = app.getPath('userData') + '/game/'

  private readonly _localAssetMapPath = this._gamePath + 'assetMap.json'
  private readonly _remoteAssetMapPath = this._dofusOrigin + 'assetMap.json'

  private readonly _localLindoManifestPath = this._gamePath + 'lindoManifest.json'
  private readonly _remoteLindoManifestPath =
    'https://raw.githubusercontent.com/Clover-Lindo/lindo-game-base/master/manifest.json'

  private readonly _localDofusManifestPath = this._gamePath + 'manifest.json'
  private readonly _remoteDofusManifestPath = this._dofusOrigin + 'manifest.json'

  private readonly _localVersionsPath = this._gamePath + 'versions.json'
  private readonly _localRegexPath = this._gamePath + 'regex.json'

  private readonly _httpClient: AxiosInstance

  private constructor(updaterWindow: UpdaterWindow) {
    this._updaterWindow = updaterWindow
    this._httpClient = axios.create()
    axiosRetry(this._httpClient, { retries: 5, retryDelay: () => 1000 })
  }

  static async init(): Promise<GameUpdater> {
    const updaterWindow = await UpdaterWindow.init()
    return new GameUpdater(updaterWindow)
  }

  async run() {
    // create folder if missing
    // fs.rmSync(this._gamePath, { recursive: true, force: true })
    fs.mkdirSync(this._gamePath, { recursive: true })
    fs.mkdirSync(this._gamePath + 'build', { recursive: true })

    console.log('GameUpdater -> DOWNLOADING ALL MANIFESTS')

    const [, remoteAssetManifest, assetDiffManifest] = await retrieveManifests({
      localManifestPath: this._localAssetMapPath,
      remoteManifestPath: this._remoteAssetMapPath,
      httpClient: this._httpClient
    })
    const [, remoteLindoManifest, lindoDiffManifest] = await retrieveManifests({
      localManifestPath: this._localLindoManifestPath,
      remoteManifestPath: this._remoteLindoManifestPath,
      httpClient: this._httpClient
    })
    const [, remoteDofusManifest, dofusDiffManifest] = await retrieveManifests({
      localManifestPath: this._localDofusManifestPath,
      remoteManifestPath: this._remoteDofusManifestPath,
      httpClient: this._httpClient
    })

    console.log('DOWNLOAD MISSING ASSETS FILES ON DISK..')
    await this._downloadAssetsFiles(assetDiffManifest, remoteAssetManifest)

    console.log('DOWNLOAD MISSING LINDO AND DOFUS FILES IN MEMORY..')
    const [missingLindoFiles, missingDofusFiles] = await this._retrieveMissingLindoAndDofusFiles(
      lindoDiffManifest,
      remoteLindoManifest,
      dofusDiffManifest,
      remoteDofusManifest
    )

    console.log('FINDING VERSIONS..')
    const localVersions = await this._findingVersions(missingDofusFiles)

    console.log('APPLYING REGEX (LINDO OVERRIDE) ON DOFUS MISSING FILES')
    this._applyRegex(lindoDiffManifest, missingLindoFiles, missingDofusFiles)

    console.log('WRITING LINDO AND DOFUS MISSING FILES TO DISK')
    this._writeMissingFiles(missingLindoFiles)
    this._writeMissingFiles(missingDofusFiles)

    console.log('REMOVING OLD ASSETS AND DOFUS FILES..')
    this._removeOldAssets(dofusDiffManifest, remoteDofusManifest)
    this._removeOldAssets(lindoDiffManifest, remoteLindoManifest)

    // TODO: write manifest
    console.log('SAVING ALL JSON FILES TO DISK')
    await Promise.all([
      fs.writeFile(this._localAssetMapPath, JSON.stringify(remoteAssetManifest)),
      fs.writeFile(this._localLindoManifestPath, JSON.stringify(remoteLindoManifest)),
      fs.writeFile(this._localDofusManifestPath, JSON.stringify(remoteDofusManifest)),
      fs.writeFile(this._localVersionsPath, JSON.stringify(localVersions))
    ])

    console.log('FINISH')
    this._updaterWindow.close()
  }

  private _writeMissingFiles(files: Files) {
    for (const filename in files) {
      let fileContent: string
      if (typeof files[filename] === 'object') {
        fileContent = JSON.stringify(files[filename])
      } else {
        fileContent = files[filename] as string
      }

      fs.writeFileSync(this._gamePath + filename, fileContent)
    }
  }

  private _removeOldAssets(differences: DiffManifest, manifest: Manifest) {
    for (const key in differences) {
      if (differences[key] === -1) {
        const filePath = this._gamePath + manifest.files[key].filename
        const directoryPath = path.dirname(filePath)

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)

          const directory = fs.readdirSync(directoryPath)
          if (directory.length === 0) fs.rmdirSync(directoryPath)
        }
      }
    }
  }

  private _applyRegex(lindoDiffManifest: DiffManifest, missingLindoFiles: Files, missingDofusFiles: Files) {
    let regex: RegexPatches

    if (lindoDiffManifest['regex.json'] === 1) {
      regex = missingLindoFiles['regex.json'] as RegexPatches
    } else {
      regex = fs.existsSync(this._localRegexPath) ? JSON.parse(fs.readFileSync(this._localRegexPath, 'utf-8')) : {}
    }

    for (const filename in regex) {
      if (missingDofusFiles[filename]) {
        if (/.js$/.test(filename)) {
          missingDofusFiles[filename] = beautify.js(missingDofusFiles[filename] as string, {
            break_chained_methods: true
          })
        } else if (/.css$/.test(filename)) {
          missingDofusFiles[filename] = beautify.css(missingDofusFiles[filename] as string)
        }

        for (const i in regex[filename]) {
          missingDofusFiles[filename] = (missingDofusFiles[filename] as string).replace(
            new RegExp(regex[filename][i][0], 'g'),
            regex[filename][i][1]
          )
        }
      }
    }
  }

  private async _findingVersions(missingDofusFiles: Files): Promise<GameVersion> {
    const localVersions: GameVersion = fs.existsSync(this._localVersionsPath)
      ? JSON.parse(fs.readFileSync(this._localVersionsPath, 'utf-8'))
      : {}

    const buildScriptFile = missingDofusFiles['build/script.js']
    if (buildScriptFile && typeof buildScriptFile === 'string') {
      console.log('FETCH BUILD VERSION FROM script.js')
      localVersions.buildVersion = buildScriptFile.match(/window\.buildVersion\s?=\s?"(\d+\.\d+\.\d+(?:-\d+)?)"/)![1]
      localVersions.appVersion = await this._httpClient
        .get<ItunesLookup>(this._dofusOriginItunes)
        .then((response) => response.data.results[0].version)
    }

    console.log(
      'VERSIONS : buildVersion = ' + localVersions.buildVersion + ' - appVersion = ' + localVersions.appVersion
    )

    return localVersions
  }

  private async _retrieveMissingLindoAndDofusFiles(
    lindoDiff: DiffManifest,
    remoteLindo: Manifest,
    dofusDiff: DiffManifest,
    remoteDofus: Manifest
  ) {
    const lindoFiles: Files = {}
    for (const i in lindoDiff) {
      if (lindoDiff[i] === 1) {
        lindoFiles[i] = await this._downloadFile(remoteLindo.files[i].filename)
      }
    }

    /** Redownload forced dofus if regex has changed */
    if (lindoDiff['regex.json'] === 1) {
      for (const i in dofusDiff) dofusDiff[i] = 1
    }

    const dofusFiles: Files = {}
    for (const i in dofusDiff) {
      if (dofusDiff[i] === 1) {
        dofusFiles[i] = await this._downloadFile(this._dofusOrigin + remoteDofus.files[i].filename)
      }
    }
    return [lindoFiles, dofusFiles]
  }

  private async _downloadAssetsFiles(diffManifest: DiffManifest, remoteAsset: Manifest, async: boolean = true) {
    // const initialStatus = this.progressText

    // const totalDownload = Object.keys(diffManifest).reduce((acc, key) => acc + (diffManifest[key] === 1 ? 1 : 0), 0)
    let currentDownload = 0

    if (async) {
      const promises = []

      let intervalLastValue = 0
      const interval = setInterval(() => {
        if (intervalLastValue === currentDownload) {
          clearInterval(interval)
          console.log('FAILED TO DOWNLOAD IN ASYNC. RESTARTING IN SYNCHRONOUS MODE')

          // this.startingUpdate(false)
        }

        intervalLastValue = currentDownload
      }, 30000)

      for (const i in diffManifest) {
        if (diffManifest[i] === 1) {
          promises.push(
            new Promise((resolve) => {
              const url = this._dofusOrigin + remoteAsset.files[i].filename
              const filePath = this._gamePath + remoteAsset.files[i].filename

              const directoryPath = path.dirname(filePath)
              if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true })
              }

              this._httpClient.get(url, { responseType: 'stream' }).then((response) => {
                response.data.pipe(fs.createWriteStream(filePath))
                currentDownload++

                // this.progressText = initialStatus + ' (' + currentDownload + '/' + totalDownload + ')'
                resolve(true)
              })
            })
          )
        }
      }

      await Promise.all(promises)
    } else {
      for (const i in diffManifest) {
        if (diffManifest[i] === 1) {
          const url = this._dofusOrigin + remoteAsset.files[i].filename
          const filePath = this._gamePath + remoteAsset.files[i].filename

          const directoryPath = path.dirname(filePath)
          if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true })
          }

          const fileWriteStream = fs.createWriteStream(filePath)

          const response = await this._httpClient.get(url, { responseType: 'stream' })
          response.data.pipe(fileWriteStream)

          fileWriteStream.on('finish', () => {
            // this.progressText = initialStatus + ' (' + currentDownload + '/' + totalDownload + ')'
            currentDownload++
          })
        }
      }
    }
  }

  private _downloadFile(url: string) {
    return this._httpClient.get(url).then((response) => response.data)
  }
}
