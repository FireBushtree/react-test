import type { ReactElementType } from 'react'

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
export function enqueueUpdate(updateQueue: any, update: any) {
  updateQueue.shared.pending = update
}
