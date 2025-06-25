import type { FiberNode, FiberRootNode } from './fiber'
import { beginWork } from './beginWork'
import { completeWork } from './completeWork'
import { createWorkInProgress } from './fiber'
import { MutationMask, NoFlag } from './fiberFlags'
import { HostRoot } from './workTags'

let workInProgress: FiberNode | null = null

export function scheduleUpdateOnFiber(fiber: FiberNode) {
  // TODO 从当前节点找到根节点的过程
  const root = makeUpdateFromFiberToRoot(fiber) as FiberRootNode
  renderRoot(root)
}

function makeUpdateFromFiberToRoot(fiber: FiberNode): FiberRootNode | null {
  let node = fiber
  let parent = fiber.return

  while (parent !== null) {
    node = parent
    parent = parent.return
  }

  if (node.tag === HostRoot) {
    return node.stateNode as FiberRootNode
  }

  return null
}

function renderRoot(root: FiberRootNode) {
  // 1. init workInProgress
  workInProgress = createWorkInProgress(root.current, {})

  // 2. workLoop
  workLoop()
  root.finishedWork = root.current.alternate

  // 3. commitRoot
  commitRoot(root)
}

function workLoop() {
  while (workInProgress !== null) {
    // 执行调度
    performUnitOfWork(workInProgress)
  }
}

function performUnitOfWork(wip: FiberNode) {
  const next = beginWork(wip)
  wip.memoizedProps = wip.pendingProps // 更新 props

  if (next === null) {
    completeUnitOfWork(wip)
  }
  else {
    workInProgress = next
  }
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber

  while (node !== null) {
    completeWork(node)
    node = node.return
    workInProgress = node
  }
}

function commitRoot(root: FiberRootNode) {
  const finishedWork = root.finishedWork
  if (finishedWork === null) {
    return
  }

  root.finishedWork = null

  // 判断当前节点是否有副作用等
  const subTreeHasEffect = (finishedWork.subTreeFlags & MutationMask) !== NoFlag
  const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlag

  if (subTreeHasEffect || rootHasEffect) {
    root.current = finishedWork
  }
  else {
    root.current = finishedWork
  }
}
