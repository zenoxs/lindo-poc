export type CharacterDisplayClass = new (props: { scale: 'fitin' }) => CharacterDisplay

export interface CharacterDisplay {
  new (props: { scale: 'fitin' }): CharacterDisplay
  setLook: (
    look: unknown,
    props: {
      riderOnly: boolean
      direction: number
      animation: string
      boneType: string
      skinType: string
    }
  ) => void
  rootElement: HTMLElement
}
