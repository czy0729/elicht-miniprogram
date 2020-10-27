/*
 * @Author: czy0729
 * @Date: 2019-06-11 11:26:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 11:25:56
 */
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { c, sfc, px, oss } from '@utils'
import { colorBgPlaceholder, screenWidth, radiusXs, radiusSm } from '@constants'
import errorImg from '@assets/images/error.png'
import './index.scss'

const cls = 'c-image'

function CImage({
  className,
  style,
  src,
  mode,
  width,
  height,
  round,
  radius,
  onClick
}) {
  const isAspectFit = mode === 'aspectFit'
  const _style = {
    width: px(width),
    height: px(height || width)
  }
  if (round) _style.borderRadius = px(width)
  if (radius) _style.borderRadius = px(radius === 'sm' ? radiusSm : radiusXs)
  const _src = src.includes('?x-oss-process=') ? src : oss(src)
  return (
    <View
      className={c(cls, className)}
      style={{
        backgroundColor: isAspectFit ? 'transparent' : colorBgPlaceholder,
        ..._style,
        ...style
      }}
      onClick={onClick}
    >
      <Image
        style={_style}
        mode={mode}
        src={_src}
        lazyLoad
        onError={e => {
          e.target.alt = src
          e.target.src = errorImg
        }}
      />
    </View>
  )
}

export default sfc(CImage, {
  className: '',
  style: null,
  src: '', // 路径
  mode: 'aspectFill', // 占满模式 aspectFill | aspectFit
  width: screenWidth, // 宽度
  height: null, // 高度, 不传时使用宽度
  round: false, // 是否圆形
  radius: null, // 圆角 xs | sm
  onClick: Function.prototype // 点击事件
})
