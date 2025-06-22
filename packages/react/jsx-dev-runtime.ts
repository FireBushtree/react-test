import { REACT_ELEMENT_TYPE } from 'shared'

function ReactElement(type: string, props: any, key: string | null) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props,
    key,
    __mark: 'owen s react',
  }
}

export function jsxDEV(type: string, props: any, key: string | null) {
  return ReactElement(type, props, key)
}
