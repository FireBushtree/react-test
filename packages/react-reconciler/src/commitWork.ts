import type { FiberNode, FiberRootNode } from './fiber'
import { appendInitialChild } from 'hostConfig'
import { NoFlag, Placement, Update } from './fiberFlags'
import { HostComponent, HostRoot } from './workTags'

let nextEffect: FiberNode | null = null

export function commitMutationEffects(finishedWork: FiberNode) {
  nextEffect = finishedWork

  while (nextEffect !== null) {
    commitMutationEffectsOnFiber(nextEffect)
    nextEffect = nextEffect.child
  }
}

function commitMutationEffectsOnFiber(fiber: FiberNode) {
  const flags = fiber.flags

  if ((flags & Placement) !== NoFlag) {
    // TODO placement
    commitPlacement(fiber)
    fiber.flags &= ~Placement
  }

  if ((flags & Update) !== NoFlag) {
    // TODO placement
    fiber.flags &= ~Update
  }
}

function commitPlacement(fiber: FiberNode) {
  console.warn('执行placement操作')

  const host = getHostParent(fiber)
  appendPlacementNodeIntoContainer(fiber, host)
}

function getHostParent(fiber: FiberNode) {
  let parent: FiberNode | null = fiber.return

  while (parent) {
    if (parent.tag === HostComponent) {
      return parent.stateNode
    }

    if (parent.tag === HostRoot) {
      return (parent.stateNode as FiberRootNode).container
    }

    parent = parent.return
  }

  return null
}

function appendPlacementNodeIntoContainer(finishedWork: FiberNode, host: any) {
  if (finishedWork.tag === HostComponent || finishedWork.tag === HostRoot) {
    appendInitialChild(host, finishedWork.stateNode)
  }
}
