/*
 * @Author: czy0729
 * @Date: 2020-06-29 17:59:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-23 16:28:06
 */
import Taro, { Component } from '@tarojs/taro'
import { Button, Text, View, Image } from '@tarojs/components'
import styles from './index.module.scss'

class ToMiniprogram extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '应用小程序'
  }

  state = {
    appId: '',
    path: '',
    title: '',
    desc: '',
    imgUrl: ''
  }

  componentDidMount() {
    const {
      appId = '', // 'wx0eb56af97148f03a',
      path = '', // '/pages/goods/detail/index?alias=3f1o3ufzjk49u',
      imgUrl = '', // 'https://m.elicht.com/static/images/2.ffe6.png',
      title = '', // '照度计算器',
      desc = '' // '根据灯具数量算照度，根据照度算灯具数量'
    } = this.$router.params
    this.setState({
      appId,
      path: decodeURIComponent(path),
      title: decodeURIComponent(title),
      desc: decodeURIComponent(desc),
      imgUrl: decodeURIComponent(imgUrl)
    })
    // Taro.setNavigationBarTitle({
    //   title: decodeURIComponent(title)
    // })
  }

  onClick = () => {
    const { appId, path } = this.state
    Taro.navigateToMiniProgram({
      appId,
      path,
      complete: () => {
        Taro.navigateBack({
          delta: 1
        })
      }
    })
  }

  render() {
    const { imgUrl, title, desc } = this.state
    return (
      <View className={styles.page}>
        <View className={styles.body}>
          <Image className={styles.img} src={imgUrl} />
          <Text className={styles.title}>{title}</Text>
          <Text className={styles.desc}>{desc}</Text>
          <Button className={styles.btn} onClick={this.onClick}>
            打开{title}
          </Button>
        </View>
      </View>
    )
  }
}

export default ToMiniprogram
