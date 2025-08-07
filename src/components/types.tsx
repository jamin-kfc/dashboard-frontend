type CardCode = string;
type StringDate = string;
type DateNul = Date | undefined
type Setter<T> = (arg: T)  => void

export type {CardCode, StringDate, DateNul, Setter}