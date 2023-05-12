import React from 'react'
// 错误边界捕捉的是ui错误
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  // 以下两个方法可以捕捉页面中的错误
  // 错误边界只有在代码上线之后，才能呈现出备用ui

  // 静态方法
  static getDerivedStateFromError(error: any) {
    console.log('ErrorBoundary:', error)
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  // 生命周期
  componentDidCatch(error: any, errorInfo: any) {
    console.log('ErrorBoundary---2:', error)
    // 你同样可以将-错误日志上报给服务器（埋点上报）
    // logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
