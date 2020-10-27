/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:35:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 10:41:05
 */
import Taro from 'taro'

export const WEAPP = process.env.TARO_ENV === 'weapp'

export const { screenWidth, screenHeight } = Taro.getSystemInfoSync()

export const HOST_API = 'https://m.elicht.com/api'

// 全局统一列表数据结构
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 100
  },
  _loaded: false
}

export const DEV_CONFIG = {}
