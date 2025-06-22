import type { ReactElementType } from 'react'

export interface PendingUpdate {
  action: any
}

export interface UpdateQueue {
  shared: {
    pending: PendingUpdate | null
  }
}

export function createUpdateQueue() {
  return {
    shared: {
      pending: null,
    },
  }
}

export function createUpdate(action: ReactElementType) {
  return {
    action,
  }
}

// 使用链表的数据结构 设置更新链
export function enqueueUpdate(updateQueue: UpdateQueue, update: any) {
  updateQueue.shared.pending = update
}

export function processUpdateQueue(baseState: any, pendingUpdate: PendingUpdate | null) {
  const result = {
    memoizedState: null,
  }

  if (pendingUpdate !== null) {
    const action = pendingUpdate.action

    if (typeof pendingUpdate === 'function') {
      result.memoizedState = action(baseState)
    }
    else {
      result.memoizedState = action
    }
  }

  return result
}
