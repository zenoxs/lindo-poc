export interface StatedElement {
  elementId: number
  elementState: number
}
export interface InteractiveElement {
  elementId: number
  elementTypeId: number
  enabledSkills: Record<
    number,
    {
      skillId: number
      skillInstanceUid: number
    }
  >
  _name: string
}
