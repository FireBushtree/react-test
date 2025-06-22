import type { ReactElementType } from 'react'
import { createContainer, updateContainer } from 'react-reconciler'

export function createRoot(element: HTMLElement) {
  const root = createContainer(element)

  return {
    render(app: ReactElementType) {
      updateContainer(app, root)
    },
  }
}
