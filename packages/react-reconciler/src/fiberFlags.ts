export type FiberFlags = typeof NoFlag | typeof Placement | typeof Update

export const NoFlag = 0b0000000
export const Placement = 0b0000001 // 新增节点
export const Update = 0b0000010 // 更新节点
