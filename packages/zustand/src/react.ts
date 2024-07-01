import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'

type Subscribe = Parameters<typeof useSyncExternalStoreWithSelector>[0]

type GetState<T> = () => T

type SetState<T> = (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
) => void

type StoreApi<T> = {
    setState: SetState<T>
    getState: GetState<T>
    subscribe: Subscribe
}

type StateCreator<T> = (setState: SetState<T>) => T

type EqualityFn<T> = (a: T, b: T) => boolean

/**
 * createStore 用来创建 Store，内部维护了 Store 的状态以及操作 Store 的函数 API，其中包括了：
 *  获取状态函数 getState；
 *  设置状态函数 setState；
 *  订阅函数 subscribe，组件会订阅这个 Store，当状态发生改变时会重新渲染。
 */
const createStore = <T>(createState: StateCreator<T>): StoreApi<T> => {
    const listeners = new Set<(state: T) => void>()
    // store内部状态存储于state上
    let state: T 

    const setState: SetState<T> = (partial) => {
        // setState就是create接收函数的入参
        const nextState = typeof partial === 'function'
            ? (partial as (state: T) => T)(state)
            : partial

        if (!Object.is(nextState, state)) {
            state = typeof nextState !== 'object' || nextState === null
                ? (nextState as T)
                : Object.assign({}, state, nextState)

            // 当状态发生变化时，依次通知组件re-render，也就是循环调用一遍listeners的所有函数
            listeners.forEach((listener) => listener(state))
        }
    }

    const getState = () => state

    const subscribe: Subscribe = (subscribe) => {
        // 每次订阅时将subscribe加入到listeners，subscribe的作用是触发组件重新渲染
        listeners.add(subscribe)

        return () => listeners.delete(subscribe)
    }

    const api = {
        setState,
        getState,
        subscribe
    }
    // state的初始值就是createState的调用结果
    state = createState(setState) 

    return api
}

/**
 * `useStore` 借助 `useSyncExternalStoreWithSelector` 完成订阅、状态选取、re-render优化，返回选取的状态
 */
const useStore = <State, StateSlice>(
    api: StoreApi<State>,
    selector: (state: State) => StateSlice = api.getState as any,
    equalityFn?: EqualityFn<StateSlice>,
) => {
    const slice = useSyncExternalStoreWithSelector(
        // 订阅函数
        api.subscribe,
        // 获取客户端状态
        api.getState,
        // 获取服务端状态
        api.getState,
        // 计算最终状态
        selector,
        // 判断状态变化前后是否一致函数
        equalityFn,
    )

    return slice
}

/**
 * create 完成上述函数的组合。
 */
export const create = <T>(createState: StateCreator<T>) => {
  // 拿到store，包含了全部操作store的方法
    const api = createStore(createState) 

    // useBoundStore 接收 selector（从完整的状态中选取部分状态），equalityFn（用来对比选取状态是否发生变化，从而决定是否重新渲染）。
    const useBoundStore = <TSlice = T>(
        selector?: (state: T) => TSlice,
        equalityFn?: EqualityFn<TSlice>,
    ) => useStore<T, TSlice>(api, selector, equalityFn)

    Object.assign(useBoundStore, api)

    return useBoundStore as typeof useBoundStore & StoreApi<T>
}
