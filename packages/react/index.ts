export default {}

export interface ReactElementType {
  $$typeof: symbol
  type: string
  props: any
  key: string | null
  __mark: string
}
