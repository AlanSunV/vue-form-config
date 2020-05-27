import axios from 'axios'
import * as g from '@/libs/global.js'
import { rules } from './rules'

export const setRules = (function () {
  return function (keyName, keyType) {
    const fnStack = []
    const proxy = new Proxy(
      {},
      {
        get(target, fnName) {
          if (fnName === 'get') {
            return fnStack.reduce((val, fn) => fn(val), [
              {
                keyName,
                keyType
              }
            ])
          }
          fnStack.push(rules[fnName])
          return proxy
        }
      }
    )
    return proxy
  }
})()

export const formatFormData = (obj, keys) => {
  for (const key of keys) {
    const value = obj[key]
    if (g.utils.isArr(value)) {
      obj[key] = value.toString()
    }
    if (g.utils.isBoolean(value)) {
      obj[key] = value ? 1 : 0
    }
    if (obj[key] === '' || g.utils.isUndefined(value)) {
      obj[key] = null
    }
  }
}

export const clearFormData = (obj, keys) => {
  for (const key of keys) {
    const value = obj[key]
    if (g.utils.isArr(value)) {
      obj[key] = []
    }
    if (g.utils.isString(value)) {
      obj[key] = ''
    }
    if (g.utils.isNumber(value)) {
      obj[key] = null
    }
    if (g.utils.isBoolean(value)) {
      obj[key] = false
    }
  }
}
