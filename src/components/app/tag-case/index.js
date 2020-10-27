/*
 * @Author: czy0729
 * @Date: 2020-03-16 10:40:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-09 11:04:27
 */
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Iconfont from '@base/iconfont'
import { sfc, c } from '@utils'
import styles from './index.module.scss'

function TagCase({
  className,
  icon,
  text,
  arrow,
  reverse,
  showDel,
  onClick,
  onReverse,
  onEdit,
  onDel
}) {
  return (
    <View
      className={c(
        styles.tagCase,
        {
          [styles.tagCaseReverse]: reverse
        },
        'flex',
        className
      )}
      onClick={onClick}
    >
      <View className={styles.dot} onClick={onReverse} />
      <View className={c(styles.text, 'flex')}>
        <Text className={c(styles.raw, 't-24 l-32 t-plain t-c1')}>{text}</Text>
        {!!icon && <Iconfont className='t-24 l-32 t-yellow ml-8' name={icon} />}
        {arrow && (
          <Iconfont className='t-20--h5 l-32 t-plain ml-4' name='angle-right' />
        )}
        <View
          className={c(
            styles.btns,
            {
              [styles.btnsReverse]: reverse
            },
            'flex'
          )}
          style={{
            visibility: showDel ? 'visible' : 'hidden',
            pointerEvents: showDel ? 'auto' : 'none'
          }}
        >
          <View
            className={c(styles.btn, 'flex flex-justify-center')}
            onClick={onEdit}
          >
            <Iconfont className='t-22--h5 t-plain' name='edit' />
          </View>
          <View className={styles.btnSplit} />
          <View
            className={c(styles.btn, 'flex flex-justify-center')}
            onClick={onDel}
          >
            <Iconfont className='t-20--h5 t-plain' name='close' />
          </View>
        </View>
      </View>
    </View>
  )
}

export default sfc(TagCase, {
  className: '',
  text: '',
  arrow: false,
  reverse: false,
  showDel: false,
  onClick: Function.prototype,
  onReverse: Function.prototype,
  onEdit: Function.prototype,
  onDel: Function.prototype
})
