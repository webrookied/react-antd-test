// 关于菜单State的action
export type MenuAction = {
  type: string
  keys: string[]
}
export interface OpenedMenu {
  key: string
  path: string
  title: string
}

export interface MenuState {
  SALES_REALESTATE: any[]
  REGION: any[]
  USERList: any[]
}
// 未处理
