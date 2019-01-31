import asyncZipEntriesLongest from './internal/async-zip-entries-longest'
import asyncMergeFactory from './internal/async-merge-factory'

const mergeAll = asyncMergeFactory(asyncZipEntriesLongest)

export default function curriedMergeAll (mergeFunc, ...iterables) {
  if (arguments.length === 1) {
    return iterables => mergeAll(mergeFunc, iterables)
  }

  return mergeAll(mergeFunc, iterables)
}
