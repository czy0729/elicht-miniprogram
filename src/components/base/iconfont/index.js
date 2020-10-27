/*
 * @Author: czy0729
 * @Date: 2019-06-14 11:57:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-19 11:24:04
 */
import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import { sfc, c, px } from '@utils'

const cls = 'c-iconfont'

function Iconfont({ className, style, name, onClick }) {
  let minWidth = 0
  try {
    const temp = className.match(/t-\d+/g)
    if (temp[0]) {
      minWidth = px(parseInt(temp[0].replace('t-', '')))
    }
  } catch (error) {}

  return (
    <Text
      className={c(cls, 'iconfont', `icon-${name}`, className)}
      style={{
        minWidth,
        ...style
      }}
      onClick={onClick}
    />
  )
}

export default sfc(Iconfont, {
  className: '',
  style: null,
  name: '',
  onClick: Function.prototype
})
