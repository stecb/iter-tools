import asyncZipEntriesShortest from './internal/async-zip-entries-shortest'
import asyncMergeFactory from './internal/async-merge-factory'

const merge = asyncMergeFactory(asyncZipEntriesShortest)

export default function curriedMerge (mergeFunc, ...iterables) {
  if (arguments.length === 1) {
    return iterables => merge(mergeFunc, iterables)
  }

  return merge(mergeFunc, iterables)
}
