export interface ValueChange<T> {
    readonly value: T
    readonly occurrenceCount: number
    readonly changedAt: string
}
