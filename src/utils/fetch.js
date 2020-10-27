/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:59:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-08-18 11:56:01
 */
import Taro from '@tarojs/taro'
import { info, push } from '@utils'
import { DEV_CONFIG, WEAPP } from '@constants'

let extConfig // 服务商参数
let hasPushLogin = false

/**
 * 统一请求方法
 * @param {*} param
 */
export default function fetch({
  method = 'GET',
  url,
  data = {},
  header = {},
  onCatch = Function.prototype
}) {
  const UserStore = require('../stores/user').default
  if (WEAPP && !extConfig) {
    extConfig = Taro.getExtConfigSync ? Taro.getExtConfigSync() : {}
  }

  const _data = {
    ...extConfig,
    ...data
  }

  const _header = {
    ...header
  }
  if (!url.includes('!') && UserStore.token) {
    _header['X-Token'] = UserStore.token
  }

  if (method === 'POST') {
    _header['content-type'] = 'application/x-www-form-urlencoded'
  }

  if (Object.keys(DEV_CONFIG).length) {
    Object.keys(DEV_CONFIG).forEach(item => (_data[item] = DEV_CONFIG[item]))
  }

  return Taro.request({
    method,
    header: _header,
    url: url.replace('!', ''),
    data: _data
  })
    .then(response => {
      const { message } = response.data
      if (
        typeof message === 'string' &&
        message.toLowerCase().includes('authentication')
      ) {
        UserStore.updateToken('')
        if (!hasPushLogin) {
          push('login', {
            from: 'fetch'
          })
        }

        setTimeout(() => {
          info('登录过期')
        }, 80)
        return Promise.reject(message)
      }
      return Promise.resolve(safe(response.data))
    })
    .catch(ex => {
      onCatch(ex)
      info(`${url.replace('!', '')} ${JSON.stringify(ex)}`)
      return Promise.reject(ex)
    })
}

/**
 * 接口某些字段为空返回null, 影响到es6函数初始值的正常使用, 统一处理成空字符串
 * @param {*} data
 */
function safe(data) {
  return JSON.parse(JSON.stringify(data).replace(/:null/g, ':""'))
}
