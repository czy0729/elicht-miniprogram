/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:35:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 11:24:18
 */
import Taro from '@tarojs/taro'

export const WEAPP = process.env.TARO_ENV === 'weapp'

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

/**
 * style
 */
export const { screenWidth, screenHeight } = Taro.getSystemInfoSync()
export const pxRatio = screenWidth / 750

/**
 * 获取手机各个区域的高度信息
 * 因自定义与非自定义头的页面, 每次渲染数据都不一样, 所以必须每次渲染的时候动态获取
 */
export function phone() {
  const {
    statusBarHeight,
    screenTop,
    screenHeight: _screenHeight,
    windowHeight,
    safeArea = {}
  } = Taro.getSystemInfoSync()
  const statusBar = statusBarHeight // 导航栏
  const header = screenTop - statusBar || 0 // 头部
  let body = windowHeight // 内容区域
  if (body === screenWidth && typeof window !== 'undefined') {
    body = window.screen.height
  }

  const { bottom = 0 } = safeArea
  const safeBottom = _screenHeight - bottom // 底部安全距离
  const tabBar = WEAPP ? 0 + safeBottom : 98 // 底部导航栏高度
  return {
    statusBar,
    header,
    body,
    safeBottom,
    tabBar,
    pxRatio,
    screenWidth,
    screenHeight: _screenHeight
  }
}

export const colorBgPlaceholder = 'rgba(243, 243, 243, 1)' // 占位背景色
export const radiusXs = 6
export const radiusSm = 12
