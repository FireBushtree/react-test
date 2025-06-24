import type { ReactElementType } from 'react'
import type { FiberFlags } from './fiberFlags'
import type { UpdateQueue } from './updateQueue'
import type { WorkTag } from './workTags'
import { NoFlag } from './fiberFlags'
import { HostComponent } from './workTags'

export class FiberNode {
  tag: WorkTag
  type: string | null
  stateNode: HTMLElement | FiberRootNode | Text | null
  child: FiberNode | null = null // 子节点
  sibling: FiberNode | null = null // 兄弟节点
  return: FiberNode | null = null // 父节点
  pendingProps: any
  key: string | null
  updateQueue: UpdateQueue | null
  alternate: FiberNode | null = null // 双缓冲
  memoizedProps: any = null // 上一次的 props
  memoizedState: any = null // 上一次的 state
  flags: FiberFlags // FiberFlags

  constructor(tag: WorkTag, pendingProps: any, key: string | null) {
    this.tag = tag
    this.pendingProps = pendingProps
    this.type = null
    this.key = key
    this.stateNode = null
    this.updateQueue = null
    this.flags = NoFlag
  }
}

export class FiberRootNode {
  container: HTMLElement
  current: FiberNode
  finishedWork: FiberNode | null = null

  constructor(container: HTMLElement, hostRootFiber: FiberNode) {
    this.container = container
    this.current = hostRootFiber
    hostRootFiber.stateNode = this
  }
}

export function createWorkInProgress(fiber: FiberNode, pendingProps: any): FiberNode {
  let wip = fiber.alternate

  if (wip === null) {
    // 如果没有双缓冲的 fiber 则创建一个新的
    wip = new FiberNode(fiber.tag, fiber.pendingProps, fiber.key)
    wip.stateNode = fiber.stateNode // 复制 stateNode
    wip.alternate = fiber // 双缓冲
    fiber.alternate = wip // 双缓冲
  }
  else {
    // update
    wip.pendingProps = pendingProps // 更新 props
  }

  wip.type = fiber.type
  wip.updateQueue = fiber.updateQueue
  wip.child = fiber.child
  wip.memoizedProps = fiber.memoizedProps
  wip.memoizedState = fiber.memoizedState

  return wip
}

export function createFiberFromElement(element: ReactElementType): FiberNode {
  const { key, props, type } = element

  const tag: WorkTag = HostComponent

  // TODO function component
  const fiber = new FiberNode(tag, props, key)
  fiber.type = type
  return fiber
}
