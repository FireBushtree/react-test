export interface ReactElement {
  $$typeof: symbol
  type: string
  props: any
  key: string | null
}

export const REACT_ELEMENT_TYPE = Symbol.for('react.element')
