import type { FiberNode } from './fiber'
import { appendInitialChild, createInstance, createTextInstance } from 'hostConfig'
import { HostComponent, HostRoot, HostText } from './workTags'

/**
 * completeWork 需要做以下这些事情
 * 1. 构建 stateNode
 * 2. 标记 flags
 */
export function completeWork(wip: FiberNode) {
  const newProps = wip.pendingProps
  const current = wip.alternate

  switch (wip.tag) {
    case HostRoot:
      return null
    case HostComponent:
      if (current !== newProps && wip.stateNode !== null) {
        // update
      }
      else {
        // mount
        const instance = createInstance(wip.type!, newProps)
        appendAllChildren(instance, wip)
        wip.stateNode = instance
      }
      return null
    case HostText:
      if (current !== newProps && wip.stateNode !== null) {
        // update
      }
      else {
        // mount
        const instance = createTextInstance(newProps.content)
        wip.stateNode = instance
      }
      return null
    default:
      return null
  }
}

function appendAllChildren(parent: HTMLElement, wip: FiberNode) {
  let node = wip.child

  if (node?.tag === HostComponent || node?.tag === HostText) {
    appendInitialChild(parent, node.stateNode)
  }
}
