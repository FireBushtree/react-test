import { createFiberFromElement, FiberNode } from './fiber'
import { Placement } from './fiberFlags'
import { HostText } from './workTags'

function ChildReconcile(shouldTrackEffect: boolean) {
  function reconcileSingleElement(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    element: any,
  ) {
    const fiber = createFiberFromElement(element)
    fiber.return = returnFiber
    return fiber
  }

  function reconcileSingleTextNode(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    content: any,
  ) {
    const fiber = new FiberNode(HostText, { content }, null)
    fiber.return = returnFiber
    return fiber
  }

  function placeSingleChild(fiber: FiberNode): FiberNode {
    if (shouldTrackEffect && fiber.alternate === null) {
      // mount 阶段
      fiber.flags |= Placement // Placement
    }
    return fiber
  }

  return function reconcileChildFibers(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild: any,
  ): FiberNode | null {
    if (typeof newChild === 'object' && newChild !== null && newChild.$$typeof) {
      // 单个 ReactElement
      return placeSingleChild(
        reconcileSingleElement(returnFiber, currentFiber, newChild),
      )
    }

    // 多节点情况

    // 文本节点
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(
        reconcileSingleTextNode(returnFiber, currentFiber, newChild),
      )
    }

    return null
  }
}

export const mountChildFibers = ChildReconcile(false)

export const reconcileChildFibers = ChildReconcile(true)
