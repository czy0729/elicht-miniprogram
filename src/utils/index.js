/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 10:42:38
 */
import Taro from 'taro'

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

export function getStorage(key) {
  return Taro.getStorage({ key })
    .then(res => res.data)
    .catch(() => '')
}

export function setStorage(key, data = '') {
  return Taro.setStorage({ key, data })
}

export function dev() {}
