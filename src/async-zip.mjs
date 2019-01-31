import asyncMerge from './async-merge'

export default function zip (...iterables) {
  return asyncMerge((...items) => [...items], ...iterables)
}
