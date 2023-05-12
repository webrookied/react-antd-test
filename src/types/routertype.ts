//路由接口
export interface RouterType {
  path: string
  element?: JSX.Element
  meta?: {
    title?: string
    hidden?: boolean
    permission?: number
    icon?: JSX.Element | React.ReactElement | React.ReactNode
  }
  children?: RouterType[]
}
