import zipEntriesLongest from './internal/zip-entries-longest'
import mergeFactory from './internal/merge-factory'

const mergeAll = mergeFactory(zipEntriesLongest)

export default function curriedMergeAll (mergeFunc, ...iterables) {
  if (arguments.length === 1) {
    return iterables => mergeAll(mergeFunc, iterables)
  }

  return mergeAll(mergeFunc, iterables)
}
