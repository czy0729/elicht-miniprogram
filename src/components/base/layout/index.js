/*
 * @Author: czy0729
 * @Date: 2020-03-10 16:48:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-24 00:07:32
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { sfc, c } from '@utils'
import styles from './index.module.scss'

function Layout({ open, showMask, onClose }) {
  return (
    <View
      className={c(styles.layout, {
        [styles.layoutShow]: !!open,
        [styles.layoutWithoutMask]: !showMask
      })}
    >
      {showMask && <View className={styles.mask} onClick={onClose} />}
      <View className={styles.fixed}>{this.props.children}</View>
    </View>
  )
}

export default sfc(Layout, {
  open: false,
  showMask: true,
  onClose: Function.prototype
})
