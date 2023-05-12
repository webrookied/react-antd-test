import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from 'store/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
// useAppSelector 就是注解好的一个useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
