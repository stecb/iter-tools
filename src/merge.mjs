import zipEntriesShortest from './internal/zip-entries-shortest'
import mergeFactory from './internal/merge-factory'

const merge = mergeFactory(zipEntriesShortest)

export default function curriedMerge (mergeFunc, ...iterables) {
  if (arguments.length === 1) {
    return iterables => merge(mergeFunc, iterables)
  }

  return merge(mergeFunc, iterables)
}
