/* eslint-env node, jest */
const { curry, variadicCurryWithValidation } = require('../curry')

describe('curry', function () {
  it('curries', function () {
    const f = curry((a, b, c) => a + b + c)
    expect(f(1)(2)(3)).toBe(6)
    expect(f(1, 2)(3)).toBe(6)
    expect(f(1, 2, 3)).toBe(6)
  })
  it('works with empty invocation', function () {
    const f = curry((a, b, c) => a + b + c)
    expect(f()()(1)(2)(3)).toBe(6)
  })
  it('works with function with 0 arity', function () {
    const f = curry(() => 4)
    expect(f()).toBe(4)
  })
})

describe('variadicCurryWithValidation', function () {
  it('curries', function () {
    const f = variadicCurryWithValidation((x) => x === '\n', 'new line', () => '!', (a = 'mars', b, c) => a + b + c, 1, 3)
    expect(f('hello ')('world')('\n')).toBe('hello world!')
    expect(f('hello ')('\n')).toBe('marshello !')
  })
  it('works using function arity', function () {
    const f = variadicCurryWithValidation((x) => x === '\n', 'new line', () => '!', (a, b) => a + b)
    expect(f('hello world')('\n')).toBe('hello world!')
  })
  it('works with empty invocation', function () {
    const f = variadicCurryWithValidation((x) => x === null, 'null', (x) => 0, (a, b, c) => a + b + c)
    expect(f()()(1)(5)(null)).toBe(6)
  })
  it('works with function with arity === 1', function () {
    const f = variadicCurryWithValidation((x) => x === null, 'null', (x) => 0, (a) => a + 1)
    expect(f()()(null)).toBe(1)
  })
  it('throws with too many args', function () {
    const func = (a, b, c) => a + b + c
    const f = variadicCurryWithValidation((x) => x === null, 'null', (x) => 0, func)
    expect(() => f(1)(2)(3)).toThrowError(new Error('func takes up to 2 arguments, followed by null. You already passed 3 arguments and the last argument was not null'))
  })
})
