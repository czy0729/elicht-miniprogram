/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 12:10:44
 */
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import classNames from 'classnames'
import { WEAPP } from '@constants'

/**
 * classNames引用 (缩短引用)
 * @param  {...any} arg
 */
export function c(...arg) {
  return classNames(...arg)
}

/**
 * Taro 转单位 (缩短引用)
 * @param  {...any} arg
 */
export function px(...arg) {
  return Taro.pxTransform(...arg)
}

/**
 * [stateless function component] 无状态组件公用逻辑HOC
 * @param {*} component
 * @param {*} defaultProps
 */
export function sfc(component, defaultProps) {
  component.defaultProps = defaultProps
  component.options = {
    addGlobalClass: true
  }

  if (component.isMobxInjector === true) {
    return component
  }
  return observer(component)
}

/**
 * 选择OSS图片质量
 * @param {*} url
 * @param {*} w
 */
export function oss(url = '', w = 480) {
  try {
    if (!url) {
      return ''
    }

    if (
      url.includes(`?x-oss-process=style/w${w}`) ||
      (url.indexOf('http') !== 0 && url.indexOf('//') !== 0)
    ) {
      return url
    }

    // 强制复写w
    if (url.includes('?x-oss-process=style/w')) {
      return `${url.split('?')[0]}?x-oss-process=style/w${w}`
    }

    return `${url}?x-oss-process=style/w${w}`
  } catch (error) {
    return url
  }
}

/**
 * @param {*} payload
 * @param {*} encode
 */
export function urlStringify(payload, encode = true) {
  const arr = Object.keys(payload).map(
    key => `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  )
  return arr.join('&')
}

/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
 * 使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
 * @param {*} url
 * @param {*} options
 */
export function push(url, options = {}) {
  if (!url) {
    Taro.showToast({
      title: '缺少页面',
      icon: 'none',
      duration: 800
    })
    return
  }

  // H5端因会把数据暴露到地址栏, 需要把options的key中`_`开头的占位数据清走
  const _options = {}
  Object.keys(options).forEach(item => {
    if (!WEAPP && item.indexOf('_') === 0) {
      return
    }
    _options[item] = options[item]
  })

  // 简化url的传参
  let _url
  if (url.includes('/pages')) {
    _url = url
  } else if (url.split('/').length > 1) {
    _url = `/pages/${url}`
  } else {
    _url = `/pages/${url}/index`
  }

  return Taro.navigateTo({
    url: `${_url}?${urlStringify(_options)}`
  })
}

/**
 * 返回timestamp
 * @param  {String} date  指定时间，例2018/11/11 00:00:00
 * @return {Int}    时间戳
 */
export function getTimestamp(date) {
  return date
    ? Math.floor(new Date(date.replace(/-/g, '/')).valueOf() / 1000)
    : Math.floor(new Date().valueOf() / 1000)
}

/**
 * @param {*} name
 */
export function getQuery(name) {
  if (typeof window === 'undefined') {
    return null
  }

  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

/**
 * 构造query参数key
 * @param {*} query
 */
export function getQueryKeyString(query) {
  if (!query) return 0
  return Object.keys(query)
    .sort((a, b) => a.localeCompare(b))
    .map(key => `${key}=${query[key]}`)
    .join()
}

export function t(_px) {
  if (String(_px).includes('px')) {
    return _px
  }
  return `${px}px`
}

/**
 * px自动补全
 * @param {*} px
 */
export function transform(_px) {
  if (String(_px).includes('px')) {
    return _px
  }
  return `${px}px`
}

export function getStorage(key) {
  return Taro.getStorage({ key })
    .then(res => res.data)
    .catch(() => '')
}

export function setStorage(key, data = '') {
  return Taro.setStorage({ key, data })
}

export function dev() {}
