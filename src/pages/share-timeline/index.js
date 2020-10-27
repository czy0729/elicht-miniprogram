/*
 * @Author: czy0729
 * @Date: 2020-06-22 14:37:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-10 18:19:12
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

const _url = 'https://ssl.yzess.cn/hilight/zhinan?webview=1'
const _title = '智能家居灯光装修设计指南'

export default class ShareTimeline extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: ''
  }

  state = {
    url: _url
  }

  share = {
    url: '',
    title: '',
    imgUrl: ''
  }

  onShareAppMessage = ({ webViewUrl }) => {
    const { title, imgUrl } = this.share
    if (imgUrl) {
      return {
        path: `/pages/index/index?url=${encodeURIComponent(webViewUrl)}`,
        title: title || _title,
        imageUrl: imgUrl
      }
    }

    return {
      path: `/pages/index/index?url=${encodeURIComponent(webViewUrl)}`,
      title: title || _title
    }
  }

  onShareTimeline(res) {
    const { webViewUrl = _url } = res || {}
    const { title, imgUrl } = this.share
    if (imgUrl) {
      return {
        // path: `/pages/index/index?url=${encodeURIComponent(webViewUrl)}`,
        title: title || _title,
        imageUrl: imgUrl,
        query: {
          url: encodeURIComponent(webViewUrl)
        }
      }
    }

    console.log(res)
    return {
      // path: `/pages/index/index?url=${encodeURIComponent(webViewUrl)}`,
      title: title || _title,
      query: {
        url: encodeURIComponent(webViewUrl)
      }
    }
  }

  componentWillMount() {
    const { url } = this.$router.params
    if (url) {
      this.setState({
        url: decodeURIComponent(url)
      })
    }
  }

  /**
   *  假如是小程序访问地址会有参数webview=1
   *  https://ssl.yzess.cn/hilight/zhinan/view/521?webview=1
   *
   *  每个页面初始化后调用
   *
   *  wx.miniProgram.postMessage({
   *    data: {
   *      url: 'https://ssl.yzess.cn/hilight/zhinan/view/521', // 当前网址
   *      title: '客厅-好光家居灯光指南',
   *      imgUrl: 'https://cdn.elicht.com/jinnang/home/livingroom/1/av1/111111111.jpg?x-oss-process=style/fine', // 可以放底图的OSS地址, 不传会使用默认截图
   *    }
   *  })
   */
  onMessage = ({ detail }) => {
    const { data = [] } = detail
    if (data.length) {
      const item = data[data.length - 1]
      this.share = {
        url: item.url || '',
        title: item.title || '',
        imgUrl: item.imgUrl || ''
      }
    }
  }

  get src() {
    const { url } = this.state
    if (!url.includes('webview=1')) {
      return url
    }

    return url.includes('?') ? `${url}&webview=1` : `${url}?webview=1`
  }

  render() {
    return <View />
  }
}
