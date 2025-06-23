import type { FiberNode } from './fiber'
import type { UpdateQueue } from './updateQueue'
import { mountChildFibers, reconcileChildFibers } from './childFibers'
import { processUpdateQueue } from './updateQueue'
import { HostComponent, HostRoot, HostText } from './workTags'

// 递归的 递 过程
export function beginWork(wip: FiberNode): FiberNode | null {
  switch (wip.tag) {
    case HostRoot:
      return updateHostRoot(wip)
    case HostComponent:
      return updateHostComponent(wip)
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
  wip.memoizedState = memoizedState // 就是 <App /> 组件的 state

  // 构建 child 节点 -> child FiberNode
  reconcileChildren(wip, wip.memoizedState)
  return wip.child
}

/**
 * HostComponent 就是 <div>hello</div> 这种原生dom， 不需要去维护state
 */
function updateHostComponent(wip: FiberNode) {
  reconcileChildren(wip, wip.pendingProps.children)
  return wip.child
}

function reconcileChildren(wip: FiberNode, children: any) {
  const current = wip.alternate

  if (current === null) {
    // mount 阶段
    wip.child = mountChildFibers(wip, null, children)
  }
  else {
    // update 阶段
    wip.child = reconcileChildFibers(wip, current?.child, children)
  }
}
