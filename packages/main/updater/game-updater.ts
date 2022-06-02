import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import fs from 'fs-extra'
import path from 'path'
import * as beautify from 'js-beautify'
import { UpdaterWindow } from '../windows/updater-window'
import { Files, ItunesLookup, Manifest, RegexPatches } from './models'
import { DiffManifest, retrieveManifests } from './updater-utils'
import {
  DOFUS_ITUNES_ORIGIN,
  DOFUS_ORIGIN,
  GAME_PATH,
  LOCAL_ASSET_MAP_PATH,
  LOCAL_DOFUS_MANIFEST_PATH,
  LOCAL_LINDO_MANIFEST_PATH,
  REMOTE_LINDO_MANIFEST_URL,
  LOCAL_REGEX_PATH,
  LOCAL_VERSIONS_PATH,
  REMOTE_ASSET_MAP_URL,
  REMOTE_DOFUS_MANIFEST_URL
} from '../constants'

interface GameVersion {
  buildVersion: string
  appVersion: string
}

export class GameUpdater {
  private readonly _updaterWindow: UpdaterWindow

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
    // fs.rmSync(GAME_PATH, { recursive: true, force: true })
    fs.mkdirSync(GAME_PATH, { recursive: true })
    fs.mkdirSync(GAME_PATH + 'build', { recursive: true })

    this._updaterWindow.sendProgress({ message: 'DOWNLOADING ALL MANIFESTS', percent: 0 })

    const [, remoteAssetManifest, assetDiffManifest] = await retrieveManifests({
      localManifestPath: LOCAL_ASSET_MAP_PATH,
      remoteManifestUrl: REMOTE_ASSET_MAP_URL,
      httpClient: this._httpClient
    })
    const [, remoteLindoManifest, lindoDiffManifest] = await retrieveManifests({
      localManifestPath: LOCAL_LINDO_MANIFEST_PATH,
      remoteManifestUrl: REMOTE_LINDO_MANIFEST_URL,
      httpClient: this._httpClient
    })
    const [, remoteDofusManifest, dofusDiffManifest] = await retrieveManifests({
      localManifestPath: LOCAL_DOFUS_MANIFEST_PATH,
      remoteManifestUrl: REMOTE_DOFUS_MANIFEST_URL,
      httpClient: this._httpClient
    })

    this._updaterWindow.sendProgress({ message: 'DOWNLOAD MISSING ASSETS FILES ON DISK..', percent: 10 })
    await this._downloadAssetsFiles(assetDiffManifest, remoteAssetManifest)

    this._updaterWindow.sendProgress({ message: 'DOWNLOAD MISSING LINDO AND DOFUS FILES IN MEMORY..', percent: 40 })
    const [missingLindoFiles, missingDofusFiles] = await this._retrieveMissingLindoAndDofusFiles(
      lindoDiffManifest,
      remoteLindoManifest,
      dofusDiffManifest,
      remoteDofusManifest
    )

    this._updaterWindow.sendProgress({ message: 'FINDING VERSIONS..', percent: 60 })
    const localVersions = await this._findingVersions(missingDofusFiles)

    this._updaterWindow.sendProgress({ message: 'APPLYING REGEX (LINDO OVERRIDE) ON DOFUS MISSING FILES', percent: 70 })
    this._applyRegex(lindoDiffManifest, missingLindoFiles, missingDofusFiles)

    this._updaterWindow.sendProgress({ message: 'WRITING LINDO AND DOFUS MISSING FILES TO DISK', percent: 80 })
    this._writeMissingFiles(missingLindoFiles)
    this._writeMissingFiles(missingDofusFiles)

    this._updaterWindow.sendProgress({ message: 'REMOVING OLD ASSETS AND DOFUS FILES..', percent: 90 })
    this._removeOldAssets(dofusDiffManifest, remoteDofusManifest)
    this._removeOldAssets(lindoDiffManifest, remoteLindoManifest)

    this._updaterWindow.sendProgress({ message: 'SAVING ALL JSON FILES TO DISK', percent: 100 })
    await Promise.all([
      fs.writeFile(LOCAL_ASSET_MAP_PATH, JSON.stringify(remoteAssetManifest)),
      fs.writeFile(LOCAL_LINDO_MANIFEST_PATH, JSON.stringify(remoteLindoManifest)),
      fs.writeFile(LOCAL_DOFUS_MANIFEST_PATH, JSON.stringify(remoteDofusManifest)),
      fs.writeFile(LOCAL_VERSIONS_PATH, JSON.stringify(localVersions))
    ])

    console.log('UPDATE FINISH')
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

      fs.writeFileSync(GAME_PATH + filename, fileContent)
    }
  }

  private _removeOldAssets(differences: DiffManifest, manifest: Manifest) {
    for (const key in differences) {
      if (differences[key] === -1) {
        const filePath = GAME_PATH + manifest.files[key].filename
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
      regex = fs.existsSync(LOCAL_REGEX_PATH) ? JSON.parse(fs.readFileSync(LOCAL_REGEX_PATH, 'utf-8')) : {}
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
    const localVersions: GameVersion = fs.existsSync(LOCAL_VERSIONS_PATH)
      ? JSON.parse(fs.readFileSync(LOCAL_VERSIONS_PATH, 'utf-8'))
      : {}

    const buildScriptFile = missingDofusFiles['build/script.js']
    if (buildScriptFile && typeof buildScriptFile === 'string') {
      console.log('FETCH BUILD VERSION FROM script.js')
      localVersions.buildVersion = buildScriptFile.match(/window\.buildVersion\s?=\s?"(\d+\.\d+\.\d+(?:-\d+)?)"/)![1]
      localVersions.appVersion = await this._httpClient
        .get<ItunesLookup>(DOFUS_ITUNES_ORIGIN)
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
        dofusFiles[i] = await this._downloadFile(DOFUS_ORIGIN + remoteDofus.files[i].filename)
      }
    }
    return [lindoFiles, dofusFiles]
  }

  private async _downloadAssetsFiles(diffManifest: DiffManifest, remoteAsset: Manifest, async: boolean = true) {
    const initialStatus = 'Downloading Dofus files'

    const totalDownload = Object.keys(diffManifest).reduce((acc, key) => acc + (diffManifest[key] === 1 ? 1 : 0), 0)
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
              const url = DOFUS_ORIGIN + remoteAsset.files[i].filename
              const filePath = GAME_PATH + remoteAsset.files[i].filename

              const directoryPath = path.dirname(filePath)
              if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true })
              }

              this._httpClient.get(url, { responseType: 'stream' }).then((response) => {
                response.data.pipe(fs.createWriteStream(filePath))
                currentDownload++

                this._updaterWindow.sendProgress({
                  message: initialStatus + ' (' + currentDownload + '/' + totalDownload + ')',
                  percent: 10 + (currentDownload / totalDownload) * 30
                })
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
          const url = DOFUS_ORIGIN + remoteAsset.files[i].filename
          const filePath = GAME_PATH + remoteAsset.files[i].filename

          const directoryPath = path.dirname(filePath)
          if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true })
          }

          const fileWriteStream = fs.createWriteStream(filePath)

          const response = await this._httpClient.get(url, { responseType: 'stream' })
          response.data.pipe(fileWriteStream)

          fileWriteStream.on('finish', () => {
            this._updaterWindow.sendProgress({
              message: initialStatus + ' (' + currentDownload + '/' + totalDownload + ')',
              percent: 10 + (currentDownload / totalDownload) * 30
            })
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
