type MethodString = string
export type UniFunction<T,R> = (t: T) => R
export type BiFunction<T,U,R> = (t: T, u: U) => R

/**
 * Ejects a method from an object without changing the context.
 */
const eject = (object: Record<string, any>, method: MethodString): Function => {
    return object[method].bind(object)
}

/**
 * Works like `eject`. However this has strict type checking.
 */
const ejectStrict = <I extends Record<string, any | Function>, F extends Function>(object: I, method: MethodString): F => {
    return object[method].bind(object)
}

export default {
    eject,
    ejectStrict
}