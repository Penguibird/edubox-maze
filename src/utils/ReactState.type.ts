
export type ReactState<T> = {
    state: T,
    setState: (a: (t: T) => T) => void
}