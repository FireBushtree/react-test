import type { ReactElementType } from 'react'
import { FiberNode, FiberRootNode } from './fiber'
import { createUpdate, createUpdateQueue, enqueueUpdate } from './updateQueue'
import { scheduleUpdateOnFiber } from './workLoop'
import { HostRoot } from './workTags'

export function createContainer(container: HTMLElement) {
  const hostRootFiber = new FiberNode(HostRoot, {}, null)
  const root = new FiberRootNode(container, hostRootFiber)
  hostRootFiber.updateQueue = createUpdateQueue()
  return root
}

export function updateContainer(element: ReactElementType, root: FiberRootNode) {
  // 设置调度 链表
  const hostRootFiber = root.current
  const update = createUpdate(element)
  enqueueUpdate(hostRootFiber.updateQueue, update)
  scheduleUpdateOnFiber(hostRootFiber)

  return element
}
