/// <reference types="react-scripts" />
interface DefaultStateType {
  list: string[]
}

type ActionType = {
  type: string
  payload: any
}
declare module 'socket.io-client'
