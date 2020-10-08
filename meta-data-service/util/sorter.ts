import { SumCount } from "../models/stats/sum-count";

export const dateSorter = (a: SumCount, b: SumCount) => { return new Date(a.date).getTime() - new Date(b.date).getTime() }