/*
 * @Author: czy0729
 * @Date: 2020-02-27 16:50:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 14:37:09
 */
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ParserRichText from '@components/wx/parser-rich-text'
import CImage from '@base/c-image'
import { sfc, c, getTimestamp, lastDate, formatCount, oss } from '@utils'
import styles from './index.module.scss'

function Info({ className, author, avatar, time, detail, pv }) {
  return (
    <View className={className}>
      {!!author && (
        <View className='flex ml-32 mr-32 mb-32 mt-32'>
          <View className='flex'>
            {avatar && (
              <CImage
                className='mr-24'
                width={64}
                src={oss(avatar, 64)}
                round
              />
            )}
            <Text className='t-28 t-desc t-b'>{author}</Text>
          </View>
        </View>
      )}
      <ParserRichText
        className='rich-body rich-body-photo'
        html={detail}
        showWithAnimation
        selectable
      />
      <View className={c(styles.copyright, 'flex')}>
        {!!time && (
          <Text className='flex-1 t-24 l-32 t-title t-extra'>
            发布于 {lastDate(getTimestamp(time))}
          </Text>
        )}
        {!!pv && (
          <Text className='t-24 l-32 t-title t-extra ml-20'>
            阅读 {formatCount(pv)}
          </Text>
        )}
      </View>
    </View>
  )
}

export default sfc(Info, {
  className: '',
  author: '',
  avatar: '',
  time: '',
  detail: '',
  pv: 0
})
