import fs from 'fs'
import fetch from 'node-fetch'
import { Manifest } from './models'

export type DiffManifest = Record<string, 1 | 0 | -1>

export const retrieveManifests = async ({
  localManifestPath,
  remoteManifestPath
}: {
  localManifestPath: string
  remoteManifestPath: string
}): Promise<[Manifest, Manifest, DiffManifest]> => {
  const localManifest: Manifest = fs.existsSync(localManifestPath)
    ? JSON.parse(fs.readFileSync(localManifestPath, 'utf8'))
    : {}
  const remoteManifest = await downloadJson<Manifest>(remoteManifestPath)
  const difference = diffManifest(localManifest, remoteManifest)

  return [localManifest, remoteManifest, difference]
}

export const downloadJson = <T>(url: string): Promise<T> => {
  console.log('Download JSON : ' + url)

  return fetch(url).then((res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.json() as any
  })
}

/**
 * Return the difference between two manifest
 * @returns {(1|-1|0)} 0 -> same files, -1 files removed, 1 file added */
export const diffManifest = (manifestA: Manifest, manifestB: Manifest): DiffManifest => {
  const differences: DiffManifest = {}

  if (manifestB && manifestB.files) {
    for (const i in manifestB.files) {
      if (
        !manifestA ||
        !manifestA.files ||
        !manifestA.files[i] ||
        manifestA.files[i].version !== manifestB.files[i].version
      ) {
        differences[i] = 1
      } else {
        differences[i] = 0
      }
    }
  }

  if (manifestA && manifestA.files) {
    for (const i in manifestA.files) {
      if (!manifestB || !manifestB.files || !manifestB.files[i]) {
        differences[i] = -1
      }
    }
  }

  return differences
}
