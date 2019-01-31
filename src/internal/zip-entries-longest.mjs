import ensureIterable from './ensure-iterable'

export default function * zipEntriesLongest (iterables) {
  let iters = []
  let itersExhausted = []

  try {
    iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
    itersExhausted = new Array(iters.length).fill(false)
    const items = new Array(iters.length)

    while (true) {
      for (let i = 0; i < iters.length; i++) {
        const item = iters[i].next()
        itersExhausted[i] = !!item.done
        items[i] = item
      }

      if (itersExhausted.every(x => x)) break

      yield items
    }
  } finally {
    if (iters) {
      for (let i = 0; i < iters.length; i++) {
        if (!itersExhausted[i] && typeof iters[i].return === 'function') {
          iters[i].return()
        }
      }
    }
  }
}
