import type { FiberNode } from './fiber'

function ChildReconcile(shouldTrackEffect) {
  function reconcileSingleElement(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    element: any,
  ) {

  }

  function reconcileSingleTextNode(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    content: any,
  ) {}

  return function reconcileChildFibers(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild: any,
  ): FiberNode {
    if (typeof newChild === 'object' && newChild !== null && newChild.$$typeof) {
      // 单个 ReactElement
      return reconcileSingleElement(returnFiber, currentFiber, newChild)
    }

    // 多节点情况

    // 文本节点
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return reconcileSingleTextNode(returnFiber, currentFiber, newChild)
    }
  }
}

export const mountChildFibers = ChildReconcile(false)

export const reconcileChildFibers = ChildReconcile(true)
