import type { FiberNode } from './fiber'
import type { UpdateQueue } from './updateQueue'
import { processUpdateQueue } from './updateQueue'
import { HostComponent, HostRoot, HostText } from './workTags'

// 递归的 递 过程
export function beginWork(wip: FiberNode): FiberNode | null {
  switch (wip.tag) {
    case HostRoot:
      return updateHostRoot(wip)
    case HostComponent:
      return null
    case HostText:
      return null

    default:
      console.warn('未实现的 tag 类型')
      return null
  }
}

function updateHostRoot(wip: FiberNode) {
  // mount 阶段
  const baseState = wip.memoizedState // null
  const updateQueue = wip.updateQueue as UpdateQueue
  const pending = updateQueue.shared.pending
  updateQueue.shared.pending = null

  // 计算最新的state
  const { memoizedState } = processUpdateQueue(baseState, pending)
  wip.memoizedState = memoizedState

  // 构建 child 节点 -> child FiberNode
  return wip.child
}
